import { Component, Input, OnInit } from '@angular/core';
import { Layer } from 'leaflet';

import { LayerManagerService, LayerItem } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';

@Component({
  selector: 'fluke-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.scss']
})
export class LayerEditorComponent implements OnInit {

  @Input() item: LayerItem = {
    layer: new Layer(),
    label: ''
  };
  @Input() type: string = '';

  isDisabled: boolean = false;
  isRenameLayer: boolean = false;
  isOpened: boolean = false;
  //isExpanded: boolean = false;

  constructor(
    private manager: LayerManagerService,
    private action: LayerViewerService) { }

  ngOnInit(): void {
  }

  _idx(): number { return this.manager.GetIdx(this.item); }

  _renameLayer(newname: string): void {
    this.manager.RenameLayer(this._idx(), newname);
  }

  _toggleLayer(): boolean {
    // disable accordian while clicking the button
    this.isDisabled = true;
    return this.manager.ToggleLayer(this._idx());
  }

  _deleteLayer(): boolean {
    // disable accordian while clicking the button
    this.isDisabled = true;
    return this.manager.RemoveLayer(this._idx());
  }

  _isVisible(name: string): boolean {
    return this.manager.IsVisible(this._idx());
  }

  _openedLayer() { this.isOpened = true; this.action.isLoading = false; }
  _closedLayer() { this.isOpened = false; this.action.isLoading = false; }

}
