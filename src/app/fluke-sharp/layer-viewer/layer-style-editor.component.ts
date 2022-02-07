import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { GeoJsonErrorStateMatcher, JsonValidator } from '@FlukeSharp/services/geojson-validator';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';

@Component({
  selector: 'flukesharp-layer-style-editor',
  templateUrl: './layer-style-editor.component.html',
  styleUrls: ['./layer-style-editor.component.scss']
})
export class LayerStyleEditorComponent implements OnInit {

  @Input() label: string = '';

  formControl: FormControl = new FormControl();
  errorChecker: ErrorStateMatcher = new ErrorStateMatcher();

  constructor(
    private manager: LayerManagerService,
    private action: LayerViewerService) { }

  ngOnInit(): void {
    this.formControl = new FormControl('{\n\n}', [JsonValidator]);
    this.errorChecker = new GeoJsonErrorStateMatcher();
  }

  _hasCustomStyle(): boolean { return this.manager.hasUserStyle(this.label); }
  _addCustomStyle() { this._editStyle(); }
  _removeCustomStyle() { this.manager.removeUserStyle(this.label); }

  _isFormError(): boolean {
    if (this.formControl.hasError('jsonInvalid')) return true;
    else return false;
  }

  _editStyle(): boolean {
    try {
      this.manager.editUserStyle(JSON.parse(this.formControl.value), this.label);
    } catch (e) {
      return false;
    }
    return true;
  }

  _editStyleSynced(): void { if (!this._isFormError()) { this._editStyle(); } }

}
