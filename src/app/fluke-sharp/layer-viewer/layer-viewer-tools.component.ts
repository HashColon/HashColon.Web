import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayerManagerService, LayerTypes } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';

@Component({
  selector: 'fluke-layer-viewer-tools',
  templateUrl: './layer-viewer-tools.component.html',
  styleUrls: ['./layer-viewer-tools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayerViewerToolsComponent implements OnInit {

  get layerTypes() { return LayerTypes; };

  constructor(
    public action: LayerViewerService,
    public layerManager: LayerManagerService
  ) { }

  ngOnInit(): void {
  }

  _addNewFileLayers(e: any) {
    this.action.AddNewFileLayers(e.target!.files);
  }


}
