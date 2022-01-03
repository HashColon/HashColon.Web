import { Injectable } from '@angular/core';
import { Database, DatabaseReference, ref, child, get, set, push, update, remove, query, equalTo, orderByChild } from '@angular/fire/database';
import { Page, MetaPage } from '@Blog/service/page.model';
import { AuthService } from '@HashColon/shared/auth.service';

function Upload(item: MetaPage | Page) {
  if (item instanceof MetaPage)
    return {
      title: item.title,
      page: item.page,
      private: item.isPrivate,
      parent: item.parent
    };
  else {
    return {
      contents: item.contents,
      datetimeIssued: item.datetimeIssued,
      datetimeLastEdited: item.datetimeLastEdited,
      tags: item.tags
    };
  }
}
interface MetaPage_forUpload {
  title: string;
  page: boolean;
  isPrivate: boolean;
  parent: string;
}

interface Page_forUpload {
  contents: string;
  datetimeIssued: Date;
  datetimeLastEdited: Date;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogCrudAuthService {

  private pageListRef: DatabaseReference;
  private pagesRef: DatabaseReference;

  constructor(
    private auth: AuthService,
    private db: Database
  ) {
    this.pageListRef = ref(this.db, 'HashColonBlog/PageList');
    this.pagesRef = ref(this.db, 'HashColonBlog/Pages');
  }

  async CreateNewMetaPage(parentKey?: string) {
    const newMetaPageRef = push(this.pageListRef);
    let newMetaPage = new MetaPage(newMetaPageRef.key ?? '', 'New Page', false, false, '');
    let parentMetaPage = new MetaPage();

    if (parentKey && parentKey != '') {
      newMetaPage.parent = parentKey;
      const parentMetaPageRef = child(this.pageListRef, parentKey);
      await this.ReadMetaPage(parentKey)
        .then(metapage => {
          parentMetaPage = metapage;
        })
        .catch((err: any) => {
          console.error("No matching parent key for new meta-page: " + parentKey);
          console.error(err);
        });
    }

    await set(newMetaPageRef, Upload(newMetaPage))
      .catch(err => {
        console.error("Failed to add meta-page");
        console.error(err);
      });

    return newMetaPageRef.key;
  }

  async CreatePage(key: string, page: Page) {
    // update MetaPage
    const newMetaPageRef = child(this.pageListRef, key);
    const newMetaPage = { 'page': true };
    await update(newMetaPageRef, newMetaPage)
      .then(() => {
        const newPageRef = child(this.pagesRef, key);
        page.datetimeIssued = new Date();
        set(newPageRef, Upload(page))
          .catch(err => {
            console.error("Failed to add page");
            console.error(err);
          });
      })
      .catch((err: any) => {
        console.error("No meta-page found for the given key: " + key);
        console.error(err);
      });
  }

  async ReadMetaPage(key: string) {
    let re: MetaPage = new MetaPage();
    if (this.auth.IsAdminAuth()) {
      const readMetaPageRef = child(this.pageListRef, key);
      await get(readMetaPageRef)
        .then(snapshot => {
          const key = snapshot.key;
          const val = snapshot.val();
          if (key) re.key = key;
          if (val.title) re.title = val.title;
          if (val.page) re.page = val.page;
          if (val.private) re.isPrivate = val.private;
          else re.isPrivate = false;
          if (val.parent) re.parent = val.parent;
        })
        .catch(err => {
          console.error("Reading meta-page failed: " + key);
          console.error(err);
        });
    }
    return re;
  }

  async ReadPage(key: string) {
    let re: Page = new Page();
    if (this.auth.IsAdminAuth()) {
      const readPageRef = child(this.pagesRef, key);
      await get(readPageRef)
        .then(snapshot => {
          const key = snapshot.key;
          const val = snapshot.val();
          if (key) re.key = key;
          if (val.contents) re.contents = val.contents;
          if (val.datetimeIssued) re.datetimeIssued = val.datetimeIssued;
          if (val.datetimeLastEdited) re.datetimeLastEdited = val.datetimeLastEdited;
          if (val.tags) re.tags = val.tags;
        })
        .catch(err => {
          console.error("Reading page failed: " + key);
          console.error(err);
        });
    }
    return re;
  }

  async ReadChildMetaPages(key?: string) {
    let res: MetaPage[] = [];
    if (!key) key = '';
    if (this.auth.IsAdminAuth()) {
      const filteredRef = query(this.pageListRef, orderByChild('parent'), equalTo(key));
      // const orderedRef = query(filteredRef, orderByChild('title'));
      await get(filteredRef)
        .then(snapshot => {
          snapshot.forEach(childsnapshot => {
            const key = childsnapshot.key;
            const val = childsnapshot.val();
            let re: MetaPage = new MetaPage();
            if (key) re.key = key;
            if (val.title) re.title = val.title;
            if (val.page) re.page = val.page;
            if (val.private) re.isPrivate = val.private;
            else re.isPrivate = false;
            if (val.parent) re.parent = val.parent;
            res.push(re);
          })
        })
        .catch(err => {
          console.error("Reading children meta-pages failed: " + key);
          console.error(err);
        });
    }
    return res;
  }

  async ReadAllMetaPages() {
    let res: MetaPage[] = [];
    if (this.auth.IsAdminAuth()) {
      const ref = query(this.pageListRef, orderByChild('title'));
      await get(ref)
        .then(snapshot => {
          snapshot.forEach(childsnapshot => {
            const key = childsnapshot.key;
            const val = childsnapshot.val();
            let re: MetaPage = new MetaPage();
            if (key) re.key = key;
            if (val.title) re.title = val.title;
            if (val.page) re.page = val.page;
            if (val.private) re.isPrivate = val.private;
            else re.isPrivate = false;
            if (val.parent) re.parent = val.parent;
            res.push(re);
          })
        })
        .catch(err => {
          console.error("Reading all meta-pages failed.");
          console.error(err);
        });
    }
    return res;
  }

  async UpdateMetaPage(key: string, metaPage: MetaPage, page?: Page) {
    // check data validity
    if (metaPage.page && !page) {
      console.error("Page data missing for the update.");
      return;
    }
    else if (!metaPage.page && !!page) {
      console.error("Undefined page data is given for the update");
      return;
    }

    const newMetaPageRef = child(this.pageListRef, key);
    await update(newMetaPageRef, Upload(metaPage))
      .then(() => {
        if (page) {
          this.ReadPage(key)
            .then(pageSnapshot => {
              this.UpdatePage(key, page)
            })
            .catch(err => this.CreatePage(key, page));
        }
        // else {
        //   this.ReadPage(key)
        //     .then(pageSnapshot => this.DeletePage(key));
        // }
      })
      .catch(err => {
        console.error("Failed to update meta-page. key: " + key);
        console.error(err);
      });
  }

  async UpdatePage(key: string, page: Page) {
    await this.ReadMetaPage(key)
      .then(snapshot => {
        const metaPage: MetaPage = snapshot;
        if (metaPage.page) {
          const newPageRef = child(this.pagesRef, key);
          page.datetimeLastEdited = new Date();
          update(newPageRef, Upload(page));
        }
        else
          console.error('No page defined in meta-page. key: ' + key);
      })
      .catch(err => {
        console.error("No meta-page found. key: " + key);
        console.error(err);
      });
  }

  async DeleteMetaPage(key: string) {
    // remove page first
    await this.DeletePage(key, true);

    const metaPageRef = child(this.pageListRef, key);
    await remove(metaPageRef)
      .catch(err => {
        console.error("Failed to delete meta-page. key: " + key);
      });
  }

  async DeletePage(key: string, shutup: boolean = false) {
    const pageRef = child(this.pagesRef, key);
    await remove(pageRef)
      .then(() => {
        const updatePageStatus = { 'page': false };
        const metaPageRef = child(this.pageListRef, key);
        update(metaPageRef, updatePageStatus)
          .catch(err => {
            console.error("Failed to update page status in meta-page. key: " + key);
          });
      })
      .catch(err => {
        if (!shutup)
          console.error("Failed to delete page. key: " + key);
      });
  }


}
