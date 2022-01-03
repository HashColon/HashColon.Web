import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WysiwygComponent } from './blog-editor/wysiwyg.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';

const routes: Routes = [
  { path: 'Blog', component: BlogViewerComponent },
  { path: 'Blog/editor', component: WysiwygComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
