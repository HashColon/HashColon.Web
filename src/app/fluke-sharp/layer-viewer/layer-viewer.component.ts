import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';
import { Layer } from 'leaflet';

@Component({
  selector: 'fluke-layer-viewer',
  templateUrl: './layer-viewer.component.html',
  styleUrls: ['./layer-viewer.component.scss']
})
export class LayerViewerComponent implements OnInit {
  @ViewChild('layerViewer') layerlist: MatAccordion = new MatAccordion;

  constructor(
    private manager: LayerManagerService,
    private action: LayerViewerService
  ) { }

  ngOnInit(): void {
    this.action.pushedAction.subscribe((actionName: string) => {
      if (actionName == 'CollapseAll') {
        this.layerlist.closeAll();
      }
      else if (actionName == 'ExpandAll') {
        this.layerlist.openAll();
      }
    });
  }

  _getAllLayers() { return this.manager.labeled; }
  _getLayerType(layer: Layer) { return this.action.GetLayerType(layer); }
}