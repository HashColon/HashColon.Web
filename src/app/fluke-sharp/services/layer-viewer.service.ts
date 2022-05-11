import { Injectable } from '@angular/core';
import { Layer, Marker, GeoJSON, LatLng } from 'leaflet';
import { Subject } from 'rxjs';
import * as leafletSetting from '@FlukeSharp/services/leaflet-custom-settings';
import { LayerManagerService, LayerItem, LayerTypes } from '@FlukeSharp/services/layer-manager.service';



@Injectable({
  providedIn: 'root'
})
export class LayerViewerService {
  // set loading status
  isLoading = false;
  // observable for non-layer-manger actions  
  private pushedActionSrc = new Subject<string>();
  pushedAction = this.pushedActionSrc.asObservable();

  constructor(
    private manager: LayerManagerService
  ) { }

  AddNewLayer(type: string): void {
    this.isLoading = true;
    var newlayer: Layer;
    switch (type) {
      // Special cases which needs inputs for new layer object
      case 'Marker': {
        this.manager.AddMarkerLayer(new LatLng(0.0, 0.0), '');
        break;
      }
      case 'GeoJSON': {
        this.manager.AddGeoJsonLayer(null, '');
        break;
      }
      // other cases 
      default: {
        this.manager.AddLayer(new LayerTypes[type], '');
        break;
      }
    }
    this.isLoading = false;
  }

  GetLayerType(layer: Layer): string {
    for (let type in LayerTypes) {
      if (layer instanceof LayerTypes[type]) {
        return type;
      }
    }
    return 'unknown';
  }

  AddNewFileLayers(filelist: FileList): boolean {
    this.isLoading = true;
    let readFinishFlags: boolean[] = new Array(filelist.length).fill(false);
    let readSuccessFlags: boolean[] = new Array(filelist.length).fill(false);

    for (let fidx = 0; fidx < filelist.length; fidx++) {
      let fileReader = new FileReader();

      // onload event: fired when file loading finished successfully
      // Parse GeoJson file & create a GeoJson layer
      fileReader.onload = (event) => {
        let geojson: any;
        // check geojson validity 
        try {
          geojson = JSON.parse(fileReader.result!.toString());
        }
        catch (e) {
          console.error('Invalid JSON file.');
          return false;
        }
        this.manager.AddGeoJsonLayer(geojson, filelist[fidx].name);
        readSuccessFlags[fidx] = true;
        console.log(filelist[fidx].name + ' loaded as layer to leaflet-map');
        return true;
      }

      // onloadend event: fired when file loading finished successfully or not
      // check if all file reading is finished. 
      // if done, change loading status to false
      fileReader.onloadend = (event) => {
        readFinishFlags[fidx] = true;
        let doneAll = true;
        for (let fidx = 0; fidx < filelist.length; fidx++) {
          doneAll = doneAll && readFinishFlags[fidx]
        }
        this.isLoading = !doneAll;
      }

      // onerror event: failed to read file
      fileReader.onerror = (event) => {
        console.error('Failed to read file: ' + filelist[fidx].name);
      }

      // onabort event: failed to read file
      fileReader.onabort = (event) => {
        console.error('Reading file aborted: ' + filelist[fidx].name);
      }

      // start reading shits!
      fileReader.readAsText(filelist[fidx]);
    }
    return true;
  }

  ClearAllLayers() {
    this.manager.RemoveAllLayers();
  }

  ShowAllLayers() {
    this.manager.ShowAllLayers();
  }

  HideAllLayers() {
    this.manager.HideAllLayers();
  }

  ToggleLayerStyles() {
    this.manager.ToggleStyles();
  }

  PushAction(actionName: string) {
    this.pushedActionSrc.next(actionName);
  }
}
