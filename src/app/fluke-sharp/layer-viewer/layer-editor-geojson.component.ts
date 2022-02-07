import { Component, Input, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { GeoJSON, Layer } from 'leaflet';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { GeoJsonErrorStateMatcher, GeoJsonValidator } from '@FlukeSharp/services/geojson-validator';

@Component({
  selector: 'fluke-layer-editor-geojson',
  templateUrl: './layer-editor-geojson.component.html',
  styleUrls: ['./layer-editor-geojson.component.scss']
})
export class LayerEditorGeojsonComponent implements OnInit {

  static readonly type: string = "GeoJSON";
  @Input() label: string = '';
  @Input() layer: Layer = new Layer();

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
      this.manager.editGeoJsonLayer(
        JSON.parse(this.formControl.value),
        this.label);
    } catch (e) {
      //console.log('_editLayer: ' + this.formControl.value);
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
    if (!this.layer) {
      this.layer = new GeoJSON() as Layer;
    }
    this.formControl = new FormControl(
      JSON.stringify((this.layer as GeoJSON).toGeoJSON(), null, 2),
      [Validators.required, GeoJsonValidator]);
    this.errorChecker = new GeoJsonErrorStateMatcher();

  }
}
