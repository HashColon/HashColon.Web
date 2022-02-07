import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '@HashColon/shared/layout.service';

@Component({
  selector: 'hashcolon-blog-viewer',
  templateUrl: './blog-viewer.component.html',
  styleUrls: ['./blog-viewer.component.scss']
})
export class BlogViewerComponent implements OnInit, AfterViewChecked {

  pageKey: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private layout: LayoutService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.pageKey = this.route.snapshot.queryParamMap.get('pageKey');

    this.route.queryParams.subscribe(params => {
      this._changePageKey(params['pageKey']);
    });
  }

  ngAfterViewChecked(): void {
    // sidenav toggle button status may change after content check
    // layout service detects horizontal/vertical layouts after content check
    // button color checked -> layout checked 
    // -> button color should be changed according to the layout 
    // -> ??? button should be checked again!
    this.changeDetector.detectChanges();
  }

  _changePageKey(newKey: string) {
    this.pageKey = newKey;
  }

  _getLayoutMode(): string { return this.layout.layoutMode; }
}
