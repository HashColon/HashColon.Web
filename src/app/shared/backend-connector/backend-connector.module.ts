import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BackendConnectorViewerComponent } from './backend-connector-viewer.component';

@NgModule({
  declarations: [BackendConnectorViewerComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule
  ],
  exports: [
    BackendConnectorViewerComponent
  ]
})
export class BackendConnectorModule { }
