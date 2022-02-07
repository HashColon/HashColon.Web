import { Component, Input, OnChanges, SecurityContext, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { Page, MetaPage, getDateString } from '@Blog/service/page.model';
import { BlogCrudOpenService } from '@Blog/service/blog-crud-open.service';

declare var hljs: any;

@Component({
  selector: 'hashcolon-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPageComponent implements OnChanges {

  @Input() pageKey: string | null = null;
  @Input() metaPage: MetaPage;
  @Input() page: Page;
  isLoading: boolean;

  constructor(
    private storage: Storage,
    private sanitizer: DomSanitizer,
    private crud?: BlogCrudOpenService
  ) {
    this.metaPage = new MetaPage();
    this.page = new Page();
    this.isLoading = true;
  }

  ngOnChanges() {
    if (this.pageKey) { this._getPage(this.pageKey); }
    else if (this.metaPage) {
      this.isLoading = false;

    }
  }

  async _getPage(key: string) {
    if (this.crud) {
      this.isLoading = true;
      await this.crud.ReadMetaPage(key)
        .then(mp => { this.metaPage = mp; })
        .catch(err => console.error(err));

      if (this.metaPage.page) {
        await this.crud.ReadPage(key)
          .then(p => { this.page = p; })
          .catch(err => console.error(err));
      }
      else {
        this.page = new Page();
      }
      this.isLoading = false;
    }
    else {
      console.error('No CRUD service provided.');
    }
  }

  _getDateTimeString(date: Date): string {
    const tmpDate = new Date(date);
    return getDateString(tmpDate, "MMM.dd.yyyy(ddd) hh:mm tt");
  }

  _getImgsFromStorage() {
    let imghtmls: HTMLCollectionOf<HTMLImageElement> = document.getElementsByTagName('img');
    for (let i in imghtmls) {
      let src = imghtmls[i].getAttribute('src');
      if (src?.startsWith('@@@')) {
        src = src.substring(3);
        getDownloadURL(ref(this.storage, "img/blog/" + src!))
          .then((url) => {
            imghtmls[i].setAttribute('src', url);
          });
      }
    }
  }

  _refreshed() {
    // apply highlight.js with <pre><code> tags
    hljs.highlightAll();
    // convert image path starting with @@@ 
    this._getImgsFromStorage();
  }

  _sanitize(content: string): string {
    return this.sanitizer.sanitize(SecurityContext.NONE, content)!;
  }
}
