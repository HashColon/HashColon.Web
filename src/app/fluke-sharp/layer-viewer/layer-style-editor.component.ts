import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Layer } from 'leaflet';
import { GeoJsonErrorStateMatcher, JsonValidator } from '@FlukeSharp/services/geojson-validator';
import { LayerManagerService, LayerItem } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';

@Component({
  selector: 'flukesharp-layer-style-editor',
  templateUrl: './layer-style-editor.component.html',
  styleUrls: ['./layer-style-editor.component.scss']
})
export class LayerStyleEditorComponent implements OnInit {

  @Input() item: LayerItem = {
    layer: new Layer(),
    label: ''
  };

  formControl: FormControl = new FormControl();
  errorChecker: ErrorStateMatcher = new ErrorStateMatcher();

  constructor(
    private manager: LayerManagerService,
    private action: LayerViewerService) { }

  ngOnInit(): void {
    this.formControl = new FormControl(
      this._hasUserStyle()
        ? JSON.stringify(this.item.userStyles, null, 2)
        : '{\n\n}',
      [JsonValidator]);
    this.errorChecker = new GeoJsonErrorStateMatcher();
  }

  _idx(): number { return this.manager.GetIdx(this.item); }
  _hasUserStyle(): boolean { return (!!this.item.userStyles); }
  _addUserStyle() { this._editStyle(); }
  _removeUserStyle() { this.manager.RemoveUserStyles(this._idx()); }

  _isFormError(): boolean {
    if (this.formControl.hasError('jsonInvalid')) return true;
    else return false;
  }

  _editStyle(): boolean {
    try {
      this.manager.EditUserStyles(
        this._idx(),
        JSON.parse(this.formControl.value)
      );
    } catch (e) {
      return false;
    }
    return true;
  }

  _editStyleSynced(): void { if (!this._isFormError()) { this._editStyle(); } }

}
