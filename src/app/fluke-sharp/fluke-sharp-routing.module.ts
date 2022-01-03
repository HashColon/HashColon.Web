import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlukeUIComponent } from '@FlukeSharp/fluke-ui/fluke-ui.component';

const routes: Routes = [
  { path: 'FlukeSharp', component: FlukeUIComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlukeSharpRoutingModule { }
