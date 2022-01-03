import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image.component';

const routes: Routes = [
  { path: 'img/**', component: ImageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
