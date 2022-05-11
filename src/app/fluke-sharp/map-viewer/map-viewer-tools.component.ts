import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TileLayerSrcs } from '@FlukeSharp/services/leaflet-custom-settings';
import { MapViewerService } from '@FlukeSharp/services/map-viewer.service';
import { LatLng, TileLayer } from 'leaflet';

const regexpNumber = /[+-]?([0-9]*[.])?[0-9]+/g
function getLatLngFromString(str: string): LatLng {
  console.log(str);
  let regmatch = str.match(regexpNumber);
  return new LatLng(parseFloat(regmatch![0]), parseFloat(regmatch![1]));
}

@Component({
  selector: 'fluke-map-viewer-tools',
  templateUrl: './map-viewer-tools.component.html',
  styleUrls: ['./map-viewer-tools.component.scss']
})
export class MapViewerToolsComponent implements OnInit {

  formControl: FormControl = new FormControl();

  readonly Ctrls: string[] = [
    "MoveTo", "Zoom"
  ];
  readonly RegexpCtrl: { [ctrl: string]: RegExp[] } = {
    "MoveTo": [
      /\b[+-]?([0-9]*[.])?[0-9]+\s*,?\s*[+-]?([0-9]*[.])?[0-9]+\b/g,
      /\b\[\s*[+-]?([0-9]*[.])?[0-9]+\s*,?\s*[+-]?([0-9]*[.])?[0-9]+\s*\]\b/g,
      /\b\(\s*[+-]?([0-9]*[.])?[0-9]+\s*,?\s*[+-]?([0-9]*[.])?[0-9]+\s*\)\b/g,
      /\b\{\s*[+-]?([0-9]*[.])?[0-9]+\s*,?\s*[+-]?([0-9]*[.])?[0-9]+\s*\}\b/g
    ],
    "Zoom": [
      /\bzoom\s*:\s*\d+\b/g
    ]
  };
  readonly CtrlFuncs: {
    [ctrl: string]:
    (ctrlstr: string[], action: MapViewerService) => void
  } = {
      "MoveTo": this._CtrlFuncs_MoveTo,
      "Zoom": this._CtrlFuncs_Zoom
    };

  _CtrlFuncs_MoveTo(ctrlstr: string[], action: MapViewerService) {
    // ignore duplicates    
    let latlng: LatLng = getLatLngFromString(ctrlstr[0] ?? "");
    // validate latlng
    if (latlng.lat > 90 || latlng.lat < -90) {
      console.error("GoTo: destination latitude not in range: " + latlng.lat);
      return;
    }
    else if (latlng.lng > 180 || latlng.lng < -180) {
      console.error("GoTo: destination longitude not in range: " + latlng.lng);
      return;
    }
    // Move leaflet map to target destination
    action.SetView(latlng);
  }

  _CtrlFuncs_Zoom(ctrlstr: string[], action: MapViewerService) {
    // ignore duplicates
    let zoom: number = parseInt(ctrlstr[0].match(regexpNumber)![0]);
    // set zoom for leaflet map
    action.SetZoom(zoom);
  }

  constructor(
    private action: MapViewerService
  ) { }

  ngOnInit(): void { }

  _getGotoCtrlStr(str: string, ctrl: string): string[] {
    let returnSet: Set<string> = new Set;
    for (let idx in this.RegexpCtrl[ctrl]) {
      (str.match(this.RegexpCtrl[ctrl][idx]) ?? []).forEach(returnSet.add, returnSet);
    }
    return [...returnSet];
  }

  Goto() { this._runGoto(this.formControl.value); }
  IsPickPosMode(): boolean { return this.action.isPickPos; }
  TogglePickPosMode() { this.action.isPickPos = !this.action.isPickPos }
  IsNauticalChartVisible(): boolean { return this.action.isNauticalChartVisible; }
  ToggleNauticalChart() { this.action.ToggleNauticalChartTiles(); }
  GetMapTiles(): TileLayerSrcs { return this.action.mapTiles; }
  ToggleMapTiles(tile: TileLayer) { this.action.ToggleMapTiles(tile); }

  _runGoto(rawscript: string) {
    let script: string = rawscript.trim();
    for (let ctrl of this.Ctrls) {
      let ctrlstr = this._getGotoCtrlStr(script, ctrl);
      this.CtrlFuncs[ctrl](ctrlstr, this.action);
    }
  }


}
