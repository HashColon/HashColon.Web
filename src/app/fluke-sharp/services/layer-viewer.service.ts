import { Injectable } from '@angular/core';
import { Layer, Marker, GeoJSON } from 'leaflet';
import { Subject } from 'rxjs';
import * as leafletSetting from '@FlukeSharp/services/leaflet-custom-settings';
import { LayerManagerService, LayerTypes } from '@FlukeSharp/services/layer-manager.service';



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
        newlayer = new Marker([0, 0], { icon: leafletSetting.markerIcon });
        break;
      }
      // other cases 
      default: {
        newlayer = new LayerTypes[type]();
      }
    }
    this.manager.pushLayer(
      newlayer, '',
      { forced: true }
    );
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
    let readflags: boolean[] = new Array(filelist.length).fill(false);

    for (let fidx = 0; fidx < filelist.length; fidx++) {
      let fileReader = new FileReader();

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
        this.manager.pushGeoJsonLayer(
          geojson, filelist[fidx].name, { forced: true }
        );

        return true;
      }
      fileReader.onloadend = (event) => {
        console.log(filelist[fidx].name + ' loaded as layer to leaflet-map');
        readflags[fidx] = true;
        let doneAll = true;
        for (let fidx = 0; fidx < filelist.length; fidx++) {
          doneAll = doneAll && readflags[fidx];
        }
        this.isLoading = !doneAll;
      }
      fileReader.readAsText(filelist[fidx]);
    }
    return true;
  }

  ClearAllLayers() {
    this.manager.clearAll();
  }

  ShowAllLayers() {
    this.manager.showAll();
  }

  HideAllLayers() {
    this.manager.hideAll();
  }

  ToggleLayerStyles() {
    this.manager.toggleStyle();
  }

  PushAction(actionName: string) {
    this.pushedActionSrc.next(actionName);
  }
}
