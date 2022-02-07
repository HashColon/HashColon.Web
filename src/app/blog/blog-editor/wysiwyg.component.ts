import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MetaPage, Page } from '@Blog/service/page.model';
import { BlogCrudAuthService } from '@Blog/service/blog-crud-auth.service';
import { BlogNavNode, BlogNavSource } from '@Blog/service/blog-navigation.model';
import { CodemirrorEditorComponent } from './codemirror-editor.component';
import { LayoutService } from '@HashColon/shared/layout.service';

@Component({
  selector: 'hashcolon-blog-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WysiwygComponent implements OnInit {
  @ViewChild('codemirror') codemirror: CodemirrorEditorComponent;

  // current editing page data components  
  metaPage: MetaPage = new MetaPage();
  page: Page = new Page();

  // form controls for editor
  keyCtrl: FormControl = new FormControl();
  titleCtrl: FormControl = new FormControl();
  tagsCtrl: FormControl = new FormControl();

  // temp storage for editing
  tmpContents: string = '';
  tmpTags: string[] = [];

  // loading status
  isItemLoading = false;
  isParentChangeMode = false;

  // tree navigation 
  blogNavTreeControl: FlatTreeControl<BlogNavNode>;
  blogNavSource: BlogNavSource;

  constructor(
    private crud: BlogCrudAuthService,
    private renderer: Renderer2,
    private layout: LayoutService
  ) {
    this.codemirror = new CodemirrorEditorComponent(renderer);

    // tree navigation     
    this.blogNavTreeControl = new FlatTreeControl<BlogNavNode>(BlogNavNode.getLevel, this._hasChildren2);
    this.blogNavSource = new BlogNavSource(this.blogNavTreeControl, crud);
  }

  ngOnInit(): void {
    //this.blogNavSource.GetInitialList();
  }

  _getLayoutMode(): string { return this.layout.layoutMode; }

  _editTitle() {
    this.metaPage.title = this.titleCtrl.value;
    //this.metaPage.title = this.titleCtrl.value;
  }

  _editTags() {
    let tagArr = this.tagsCtrl.value.match(/#(\w+)/g);
    if (tagArr)
      this.page.tags = tagArr.map((e: string) => e.substring(1));
  }

  _pageExistanceChanged() {

    this.metaPage.page = !this.metaPage.page;

    if (this.metaPage.page) {
      this.page.contents = this.tmpContents;
      this.page.tags = this.tmpTags;
    }
    else {
      this.tmpContents = this.page.contents;
      this.page.contents = '';
      this.tmpTags = this.page.tags;
      this.page.tags = [];
    }
  }

  _hasChildren(_: number, node: BlogNavNode) { return node.children; }

  _hasChildren2(node: BlogNavNode) { return node.children; }

  _navButtonClicked(key: string) {
    if (this.isParentChangeMode) {
      this.ChangeCurrentItemParent(key);
    }
    else {
      this.SetItem(key);
    }
  }

  ConvertToHashTags(tags: string[]): string {
    let re = ''
    for (let tag of tags) {
      re += '#' + tag + ' '
    }
    return re;
  }

  AddNewItem(key?: string) {
    this.crud.CreateNewMetaPage(key)
      .then(newKey => {
        if (newKey)
          this.RefreshItemList(newKey);
      });
  }

  DeleteItem(key: string) {
    this.crud.DeleteMetaPage(key)
      .then(() => {
        this.RefreshItemList();
      })
  }

  async SetItem(key: string) {
    this.isParentChangeMode = false;
    this.isItemLoading = true;
    // test: change crud to crud auth
    await this.crud.ReadMetaPage(key)
      .then((item: MetaPage) => {
        this.metaPage = item;
        this.titleCtrl.setValue(this.metaPage.title);
      });
    if (this.metaPage.page) {
      await this.crud.ReadPage(key)
        .then((item: Page) => {
          this.page = item;
          if (this.page.tags)
            this.tagsCtrl.setValue(this.ConvertToHashTags(this.page.tags));
          else
            this.tagsCtrl.setValue('');
        });
    }
    else {
      this.page = new Page();
    }
    this.codemirror.ReplaceCode(this.page.contents);
    this.isItemLoading = false;
  }

  async _setParentChangeMode(key?: string) {
    if (this.isParentChangeMode) {
      this.isParentChangeMode = false;
    }
    else if (key) {
      await this.SetItem(key);
      this.isParentChangeMode = true;
    }
    else if (this.metaPage.key) {
      this.isParentChangeMode = true;
    }
  }

  async ChangeCurrentItemParent(newParentKey: string) {
    if (this.isParentChangeMode) {
      this.metaPage.parent = newParentKey;
      await this.crud.UpdateMetaPage(this.metaPage.key, this.metaPage);
      this.RefreshItemList(this.metaPage.key);
    }
    this.isParentChangeMode = false;
  }

  async RefreshItemList(key?: string) {
    await this.blogNavSource.RefreshList(key)
      .then(path => {
        for (let item of path) {
          let node = this.blogNavTreeControl.dataNodes.find(e => e.key == item);
          if (node)
            this.blogNavTreeControl.expand(node);
        }
      });
  }

  async SubmitItem() {
    this.isItemLoading = true;
    await this.crud.UpdateMetaPage(this.metaPage.key, this.metaPage, this.metaPage.page ? this.page : undefined);
    await this.RefreshItemList(this.metaPage.key);
    this.isItemLoading = false;
  }

  _selectRoot() {
    this.metaPage = new MetaPage();
  }


}
