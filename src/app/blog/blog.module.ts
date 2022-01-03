import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { MarkdownModule } from 'ngx-markdown';

import { BlogRoutingModule } from '@Blog/blog-routing.module';
import { BlogViewerComponent } from '@Blog/blog-viewer/blog-viewer.component';
import { BlogNavigatorComponent } from '@Blog/blog-viewer/blog-navigator.component';
import { BlogPageComponent } from '@Blog/blog-viewer/blog-page.component';
import { InnerHtmlObserverDirective } from '@Blog/blog-viewer/inner-html-observer.directive';

import { WysiwygComponent } from '@Blog/blog-editor/wysiwyg.component';
import { CodemirrorEditorComponent } from '@Blog/blog-editor/codemirror-editor.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogHomeItemComponent } from './blog-home/blog-home-item.component';

@NgModule({
  declarations: [
    BlogViewerComponent,
    BlogNavigatorComponent,
    BlogPageComponent,
    InnerHtmlObserverDirective,
    WysiwygComponent, CodemirrorEditorComponent, BlogHomeComponent, BlogHomeItemComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, LayoutModule,
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatChipsModule, MatDividerModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatProgressBarModule,
    MatSidenavModule, MatToolbarModule, MatTooltipModule,
    MatTreeModule,
    MarkdownModule.forRoot(),
    BlogRoutingModule
  ],
  bootstrap: [BlogViewerComponent]
})
export class BlogModule { }
