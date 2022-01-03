import { Component, Input, OnInit } from '@angular/core';
import { MetaPage, Page } from '@Blog/service/page.model';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'hashcolon-blog-home-item',
  templateUrl: './blog-home-item.component.html',
  styleUrls: ['./blog-home-item.component.scss']
})
export class BlogHomeItemComponent implements OnInit {

  @Input() metapage: MetaPage;
  @Input() page: Page;

  constructor(
    private markdownParser: MarkdownService
  ) {
    this.metapage = new MetaPage();
    this.page = new Page();
  }

  ngOnInit(): void {
  }
  _shortenTitle(maxlen: number): string {
    if (this.metapage.title.length > maxlen) {
      return this.metapage.title.substring(0, maxlen) + "...";
    }
    else return this.metapage.title;
  }
  _shortenContents(maxlen: number): string {
    let tmp = document.createElement("div");
    tmp.innerHTML = this.markdownParser.compile(this.page.contents);
    return tmp.textContent || tmp.innerText || "";
  }
}
