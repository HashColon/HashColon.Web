import { Component, Input, OnInit } from '@angular/core';
import { Layer } from 'leaflet';

import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';

@Component({
  selector: 'fluke-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.scss']
})
export class LayerEditorComponent implements OnInit {

  @Input() label: string = '';
  @Input() layer: Layer = new Layer();
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

  _renameLayer(newname: string): boolean {
    if (this.manager.renameLayer(this.label, newname)) {
      this.label = newname;
      return true;
    }
    console.log('edit fail');
    return false;
  }

  _toggleLayer(): boolean {
    // disable accordian while clicking the button
    this.isDisabled = true;
    return this.manager.toggleLayer(this.label);

  }

  _deleteLayer(): boolean {
    // disable accordian while clicking the button
    this.isDisabled = true;
    return this.manager.removeLayer(this.label);
  }

  _isVisible(name: string): boolean {
    return this.manager.isVisible(name);
  }

  _openedLayer() { this.isOpened = true; this.action.isLoading = false; }
  _closedLayer() { this.isOpened = false; this.action.isLoading = false; }

}
