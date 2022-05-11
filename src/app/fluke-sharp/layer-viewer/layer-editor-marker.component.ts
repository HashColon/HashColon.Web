import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { Marker, Layer, LatLng } from 'leaflet';

import { LayerManagerService, LayerItem } from '@FlukeSharp/services/layer-manager.service';
import { LatValidator, LngValidator } from '@FlukeSharp/services/geojson-validator';

export class LatErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class LngErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'fluke-layer-editor-marker',
  templateUrl: './layer-editor-marker.component.html',
  styleUrls: ['./layer-editor-marker.component.scss']
})
export class LayerEditorMarkerComponent implements OnInit {

  static readonly type: string = "Marker";
  @Input() item: LayerItem = {
    layer: new Marker([0, 0]) as Layer,
    label: ''
  };

  latFormControl: FormControl = new FormControl();
  lngFormControl: FormControl = new FormControl();
  latErrorChecker: ErrorStateMatcher = new ErrorStateMatcher();
  lngErrorChecker: ErrorStateMatcher = new ErrorStateMatcher();

  _isLatFormError(): boolean {
    return (this.latFormControl.hasError('latInvalid')
      || this.latFormControl.hasError('notNumber')
      || this.latFormControl.hasError('required'));
  }
  _isLngFormError(): boolean {
    return (this.lngFormControl.hasError('lngInvalid')
      || this.latFormControl.hasError('notNumber')
      || this.lngFormControl.hasError('required'));
  }
  _isFormError(): boolean {
    return this._isLatFormError() || this._isLngFormError();
  }

  _editLayer(): boolean {
    return this.manager.EditMarkerLayer(
      this.manager.GetIdx(this.item),
      { lat: this.latFormControl.value, lng: this.lngFormControl.value }
    );
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
      this.item = {
        layer: new Marker([0, 0]) as Layer,
        label: ''
      };
    }
    // lat form control
    this.latFormControl = new FormControl(
      (this.item.layer as Marker).getLatLng().lat,
      [Validators.required, LatValidator]);
    this.latErrorChecker = new LatErrorStateMatcher();
    // lng form control
    this.lngFormControl = new FormControl(
      (this.item.layer as Marker).getLatLng().lng,
      [Validators.required, LngValidator]);
    this.lngErrorChecker = new LngErrorStateMatcher();
  }
}