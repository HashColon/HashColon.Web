import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetaPage } from '@Blog/service/page.model';
import { BlogCrudOpenService } from '@Blog/service/blog-crud-open.service';
import { BlogCrudAuthService } from '@Blog/service/blog-crud-auth.service';

export class BlogNavNode implements MetaPage {

    constructor(
        public key: string,
        public title: string,
        public page: boolean,
        public isPrivate: boolean,
        public children: boolean,
        public parent: string,
        public lvl: number = 0
    ) { };

    static getLevel = (node: BlogNavNode) => node.lvl;
    static hasChildren = (node: BlogNavNode) => !!node.children;
}

interface KeyMetaPagePair { [key: string]: MetaPage };

export class BlogNavSource implements DataSource<BlogNavNode>{

    isLoading = true;
    alldata: Map<string, MetaPage> = new Map<string, MetaPage>();

    dataChange = new BehaviorSubject<BlogNavNode[]>([]);

    get data(): BlogNavNode[] { return this.dataChange.value; }
    set data(value: BlogNavNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(
        private _treeControl: FlatTreeControl<BlogNavNode>,
        private _crud: BlogCrudOpenService | BlogCrudAuthService
    ) { }

    connect(collectionViewer: CollectionViewer): Observable<BlogNavNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if ((change as SelectionChange<BlogNavNode>).added ||
                (change as SelectionChange<BlogNavNode>).removed) {
                this.handleTreeControl(change as SelectionChange<BlogNavNode>);
            }
        });
        this.RefreshList();
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<BlogNavNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    /**
     * Toggle the node, remove from display list
     */
    async toggleNode(node: BlogNavNode, expand: boolean) {
        this.isLoading = true;
        const index = this.data.indexOf(node);
        let children: MetaPage[] = [];
        if (index >= 0) {
            if (expand) {
                this.alldata.forEach((childitem: MetaPage, childkey: string) => {
                    if (childitem.parent == node.key)
                        if (this._crud instanceof BlogCrudAuthService || !childitem.isPrivate)
                            children.push(childitem);
                })

                const nodes = children.map(metapage =>
                    new BlogNavNode(metapage.key, metapage.title, metapage.page, metapage.isPrivate,
                        this.hasChildren(metapage.key), metapage.parent, node.lvl + 1));
                this.data.splice(index + 1, 0, ...nodes);
            }
            else {
                let count = 0;
                for (let i = index + 1; i < this.data.length
                    && this.data[i].lvl > node.lvl; i++, count++) { }
                this.data.splice(index + 1, count);
            }
            this.dataChange.next(this.data);
        }
        this.isLoading = false;
    }

    hasChildren(key: string) {
        let re = false;
        this.alldata.forEach((childitem: MetaPage, childkey: string) => {
            if (childitem.parent == key)
                re = true;
        });
        return re;
    }

    async GetInitialList() {
        this.isLoading = true;
        this.data = [];

        this.alldata.forEach((item: MetaPage, key: string) => {
            if (!item.parent || item.parent == '') {
                if (this._crud instanceof BlogCrudAuthService || !item.isPrivate)
                    this.data.push(new BlogNavNode(
                        item.key, item.title, item.page, item.isPrivate,
                        this.hasChildren(item.key), item.parent));
            }
        });

        this.dataChange.next(this.data);
        this.isLoading = false;
    }

    async RefreshList(currentItemKey?: string) {
        await this.RefreshData();
        await this.GetInitialList();

        if (currentItemKey) {
            let path: string[] = [];
            let key = currentItemKey;
            path.push(key);
            while (key != '' && this.alldata.has(key)) {
                let item = this.alldata.get(key);
                if (item && item.parent) {
                    key = item.parent;
                    path.push(key);
                }
                else break;
            }
            path = path.reverse();
            return path;
        }
        return [];
    }

    async RefreshData() {
        // clear list
        this.alldata.clear();

        // get initial list
        this.isLoading = true;
        await this._crud.ReadAllMetaPages()
            .then(metaPages => {
                for (let metaPage of metaPages) {
                    this.alldata.set(metaPage.key, metaPage);
                }
            });
        this.isLoading = false;
    }

}