import { Injectable } from '@angular/core';
import { Database, DatabaseReference, ref, child, get, query, equalTo, orderByChild } from '@angular/fire/database';
import { Page, MetaPage } from '@Blog/service/page.model';

@Injectable({
  providedIn: 'root'
})
export class BlogCrudOpenService {

  private pageListRef: DatabaseReference;
  private pagesRef: DatabaseReference;

  constructor(
    private db: Database
  ) {
    this.pageListRef = ref(this.db, 'HashColonBlog/PageList');
    this.pagesRef = ref(this.db, 'HashColonBlog/Pages');
  }

  async ReadMetaPage(key: string) {
    let re: MetaPage = new MetaPage();
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
    return re;
  }

  async ReadPage(key: string) {
    let re: Page = new Page();
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
    return re;
  }

  async ReadChildMetaPages(key?: string) {
    let res: MetaPage[] = [];
    if (!key) key = '';

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
    return res;
  }

  async ReadAllMetaPages() {
    let res: MetaPage[] = [];
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
    return res;
  }
}
