import { Component, Input, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { GeoJSON, Layer } from 'leaflet';
import { LayerManagerService, LayerItem } from '@FlukeSharp/services/layer-manager.service';
import { GeoJsonErrorStateMatcher, GeoJsonValidator } from '@FlukeSharp/services/geojson-validator';

@Component({
  selector: 'fluke-layer-editor-geojson',
  templateUrl: './layer-editor-geojson.component.html',
  styleUrls: ['./layer-editor-geojson.component.scss']
})
export class LayerEditorGeojsonComponent implements OnInit {

  static readonly type: string = "GeoJSON";
  @Input() item: LayerItem = { layer: new GeoJSON() as Layer, label: '' };

  formControl: FormControl = new FormControl();
  errorChecker: ErrorStateMatcher = new ErrorStateMatcher();

  _isFormError(): boolean {
    if (this.formControl.hasError('jsonInvalid')
      || this.formControl.hasError('geoJsonInvalid')
      || this.formControl.hasError('required')) {
      return true;
    }
    else return false;
  }

  _editLayer(): boolean {
    try {
      this.manager.EditGeoJsonLayer(
        this.manager.GetIdx(this.item),
        JSON.parse(this.formControl.value)
      );
    } catch (e) {
      console.error('failed to edit this layer');
      return false;
    }
    return true;
  }

  _editLayerSynced(): void {
    if (!this._isFormError()) {
      this._editLayer();
    }
  }

  constructor(private manager: LayerManagerService) { }

  ngOnInit(): void {
    // if layer is not given
    if (!this.item) {
      this.item = { layer: new GeoJSON() as Layer, label: '' };
    }
    this.formControl = new FormControl(
      JSON.stringify((this.item.layer as GeoJSON).toGeoJSON(), null, 2),
      [Validators.required, GeoJsonValidator]);
    this.errorChecker = new GeoJsonErrorStateMatcher();
  }
}
