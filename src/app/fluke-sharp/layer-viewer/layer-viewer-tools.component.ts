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
    private action: LayerViewerService,
    private layerManager: LayerManagerService
  ) { }

  ngOnInit(): void {
  }


  _addNewLayer(typekey: string) { this.action.AddNewLayer(typekey); }
  _addNewFileLayers(e: any) { this.action.AddNewFileLayers(e.target!.files); }
  _clearAllLayers() { this.action.ClearAllLayers(); }
  _showAllLayers() { this.action.ShowAllLayers(); }
  _hideAllLayers() { this.action.HideAllLayers(); }
  _expandAllLayers() { this.action.PushAction('ExpandAll'); }
  _collapseAllLayers() { this.action.PushAction('CollapseAll'); }
  _toggleLayerStyles() { this.action.ToggleLayerStyles(); }

  _checkAutoStyle(): boolean { return this.layerManager.autoStyle; }


}
