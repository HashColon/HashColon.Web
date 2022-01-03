import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LeafletModule } from '@asymmetrik/ngx-leaflet'

import { FlukeSharpRoutingModule } from '@FlukeSharp/fluke-sharp-routing.module';
import { BackendConnectorService } from '@HashColon/shared/backend-connector/backend-connector.service';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';
import { FileExplorerService } from '@FlukeSharp/services/file-explorer.service';

// UI
import { FlukeUIComponent } from '@FlukeSharp/fluke-ui/fluke-ui.component';
// layer viewer
import { LayerViewerComponent } from '@FlukeSharp/layer-viewer/layer-viewer.component';
import { LayerViewerToolsComponent } from './layer-viewer/layer-viewer-tools.component';
import { LayerEditorComponent } from '@FlukeSharp/layer-viewer/layer-editor.component';
import { LayerEditorGeojsonComponent } from '@FlukeSharp/layer-viewer/layer-editor-geojson.component';
import { LayerEditorMarkerComponent } from '@FlukeSharp/layer-viewer/layer-editor-marker.component';
// Map viewer
import { MapViewerComponent } from '@FlukeSharp/map-viewer/map-viewer.component';
import { MapViewerToolsComponent } from '@FlukeSharp/map-viewer/map-viewer-tools.component';
// file explorer
import { FileExplorerComponent } from '@FlukeSharp/file-explorer/file-explorer.component';
import { FileExplorerToolsComponent } from '@FlukeSharp/file-explorer/file-explorer-tools.component';



@NgModule({
  declarations: [
    FlukeUIComponent,
    LayerViewerComponent,
    LayerEditorComponent, LayerEditorGeojsonComponent, LayerEditorMarkerComponent, LayerViewerToolsComponent,
    MapViewerComponent, MapViewerToolsComponent,
    FileExplorerComponent, FileExplorerToolsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    DragDropModule,
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatDividerModule, MatExpansionModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatSidenavModule,
    MatSlideToggleModule, MatTabsModule, MatToolbarModule,
    MatTooltipModule,
    LeafletModule,
    FlukeSharpRoutingModule
  ],
  providers: [
    LayerManagerService, BackendConnectorService,
    LayerViewerService, FileExplorerService
  ],
  bootstrap: [FlukeUIComponent]
})
export class FlukeSharpModule { }
