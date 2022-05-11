import { Injectable } from '@angular/core';
import { Layer, LayerGroup, GeoJSON, Marker, Path, FeatureGroup, LatLngExpression } from 'leaflet';
import * as leafletSettings from '@FlukeSharp/services/leaflet-custom-settings';


export var LayerTypes: { [key: string]: any } = {
  'GeoJSON': GeoJSON,
  'Marker': Marker
};

export interface LayerItem {
  layer: Layer;
  label: string;
  userStyles?: any;
};

export interface LayerOption {
  hide?: boolean;
}

/* does CRUD of leaflet layers 
 * Create, Read, Update, Delete 
 */
@Injectable({
  providedIn: 'root'
})
export class LayerManagerService {

  items: LayerItem[] = [];

  visible: Layer[] = [];
  autoStyle: boolean = false;

  constructor() {
  }

  /*                                          * 
   * ====== Adding a new layer: Create ====== * 
   *                                          */
  AddLayer(layer: Layer, label: string,
    options?: LayerOption, userStyles?: any): boolean {

    // create a new layer item
    var item = {
      layer: layer,
      label: label,
      userStyles: userStyles
    };

    // add the layer item into items
    var idx = this.items.push(item) - 1;


    // if the layer is set as visible, make it visible.
    if (!options || !options?.hide) {
      this.visible.push(this.items[idx].layer);
    }

    // apply style
    this.ApplyStyles(idx);

    return true;
  }

  AddGeoJsonLayer(geoJsonObj: any, label: string,
    options?: LayerOption, userStyles?: any): boolean {
    // create a empty geojson layer 
    // return this.pushLayer(newlayer, label, options);
    return this.AddLayer(
      new GeoJSON(geoJsonObj,
        {
          // style: this.stylefunc_Manual,
          onEachFeature: (feature: any, layer) => {
            if (layer instanceof Path || layer instanceof FeatureGroup || layer instanceof GeoJSON) {
              if (feature.properties.style)
                layer.setStyle(feature.properties.style);
              else
                layer.setStyle(leafletSettings.defaultPathStyles);
            }
          }
        }),
      label, options, userStyles);
  }

  AddMarkerLayer(latlng: LatLngExpression, label: string,
    options?: LayerOption, userStyles?: any): boolean {
    return this.AddLayer(
      new Marker(latlng, { icon: leafletSettings.markerIcon }),
      label, options, userStyles);
  }

  /*                                      * 
   * ====== Get layer status: Read ====== * 
   *                                      */

  GetIdx(item: LayerItem): number {
    return this.items.indexOf(item);
  }

  IsValidIdx(idx: number): boolean {
    return ((idx < this.items.length) && (idx >= 0));
  }

  IsVisible(idx: number): boolean {
    if (this.IsValidIdx(idx))
      return this.visible.indexOf(this.items[idx].layer) >= 0;
    else return false;
  }

  /*                                        * 
   * ====== Edit layer items: Update ====== * 
   *                                        */

  EditLayer(idx: number, layer: Layer): boolean {

    if (!this.IsValidIdx(idx)) return false;

    // if the layer is type of layer group, edit the layer inside the group
    if (this.items[idx].layer instanceof LayerGroup) {
      (this.items[idx].layer as LayerGroup).clearLayers();
      (this.items[idx].layer as LayerGroup).addLayer(layer);

      // apply style
      this.ApplyStyles(idx);
      return true;
    }

    return false;
  }

  EditGeoJsonLayer(idx: number, geoJsonObj: any) {

    if (!this.IsValidIdx(idx)) return false;

    // if the layer is type of layer group, edit the layer inside the group
    if (this.items[idx].layer instanceof GeoJSON) {
      (this.items[idx].layer as GeoJSON).clearLayers();
      (this.items[idx].layer as GeoJSON).addData(geoJsonObj);

      // apply style
      this.ApplyStyles(idx);
      return true;
    }

    return false;
  }

  EditMarkerLayer(idx: number, latlng: LatLngExpression) {
    if (!this.IsValidIdx(idx)) return false;

    // if the layer is type of Marker, edit latlng
    if (this.items[idx].layer instanceof Marker) {
      (this.items[idx].layer as Marker).setLatLng(latlng);

      // apply style
      this.ApplyStyles(idx);
      return true;
    }
    return false;
  }

  RenameLayer(idx: number, label: string): boolean {
    if (!this.IsValidIdx(idx)) return false;

    this.items[idx].label = label;
    return true;
  }

  /*                                               * 
   * ====== change layer visibility: Update ====== * 
   *                                               */

  ShowLayer(idx: number): boolean {
    if (!this.IsValidIdx(idx)) return false;
    if (!this.IsVisible(idx)) {
      this.visible.push(this.items[idx].layer);
      this.ApplyStyles(idx);
    }
    return true;
  }

  HideLayer(idx: number): boolean {
    if (!this.IsValidIdx(idx)) return false;
    if (this.IsVisible(idx)) {
      this.visible.splice(idx, 1);
      this.ApplyStyles();
    }
    return true;
  }

  ToggleLayer(idx: number): boolean {
    if (!this.IsValidIdx(idx)) return false;
    if (this.IsVisible(idx))
      return this.HideLayer(idx);
    else
      return this.ShowLayer(idx);
  }

  ShowAllLayers(): void {
    for (var idx = 0; idx < this.items.length; idx++)
      this.ShowLayer(idx);
    this.ApplyStyles();
  }

  HideAllLayers(): void {
    this.visible = [];
    this.ApplyStyles();
  }

  /*                                           * 
   * ====== change layer styles: Update ====== * 
   *                                           */

  EditUserStyles(idx: number, userStyles: any): boolean {
    if (!this.IsValidIdx(idx)) return false;
    this.items[idx].userStyles = userStyles;
    this.ApplyStyles(idx);
    return true;
  }

  RemoveUserStyles(idx: number): boolean {
    if (!this.IsValidIdx(idx)) return false;
    delete this.items[idx].userStyles;
    this.ApplyStyles(idx);
    return true;
  }

  ApplyStyles(idx?: number): boolean {
    // if idx is not given, apply styles for all layers
    if (!idx) {
      if (this.autoStyle)
        this.ApplyAutoStyles();
      else {
        for (let i = 0; i < this.items.length; i++)
          this.ApplyItemStyles(i);
      }
      return true;
    }
    // if idx is specified, apply styles for it
    else if (this.IsValidIdx(idx)) {
      if (this.autoStyle)
        this.ApplyAutoStyles();
      else
        this.ApplyItemStyles(idx);
      return true;
    }
    // ignore invalid idx
    else return false;
  }

  ApplyAutoStyles(): void {
    // count visible layers without userStyles
    var autoItems: number[] = [];
    for (let idx = 0; idx < this.items.length; idx++)
      if (this.IsVisible(idx) && !this.items[idx].userStyles)
        autoItems.push(idx);

    // apply auto-color
    for (let i = 0; i < autoItems.length; i++) {
      if (this.items[autoItems[i]].layer instanceof GeoJSON) {
        (this.items[autoItems[i]].layer as GeoJSON).setStyle(
          () => {
            return { color: "hsl(" + (i / autoItems.length * 360.0) + ", 100%, 40%)" }
          }
        );
      }
    }
  }

  ApplyItemStyles(idx: number): boolean {
    if (!this.IsValidIdx(idx)) return false;

    // The SEQUENCE MATTERS!!!
    // GeoJSON extends FeatureGroup.
    // therefore, if we check FeatureGroup first, 
    // then GeoJSON case may not be properly styled.

    // case layer type: GeoJSON
    if (this.items[idx].layer instanceof GeoJSON) {
      if (this.items[idx].userStyles)
        (this.items[idx].layer as GeoJSON).setStyle(
          (feature) => this.items[idx].userStyles
        );
      else
        (this.items[idx].layer as GeoJSON).setStyle(
          (feature: any) => (feature.properties && feature.properties.style)
            ? feature.properties.style
            : (leafletSettings.defaultPathStyles)
        );
    }
    // case layer type: FeatureGroup
    else if (this.items[idx].layer instanceof FeatureGroup) {
      console.log("!!");
      if (this.items[idx].userStyles)
        (this.items[idx].layer as FeatureGroup).setStyle(this.items[idx].userStyles);
      else
        (this.items[idx].layer as FeatureGroup).setStyle(leafletSettings.defaultPathStyles);
    }
    // case layer type: Path
    else if (this.items[idx].layer instanceof Path) {
      console.log("!");
      if (this.items[idx].userStyles)
        (this.items[idx].layer as Path).setStyle(this.items[idx].userStyles);
      else
        (this.items[idx].layer as Path).setStyle(leafletSettings.defaultPathStyles);
    }
    return true;
  }

  ToggleStyles(): void {
    this.autoStyle = !this.autoStyle;
    this.ApplyStyles();
  }

  /*                                    * 
   * ====== Remove layer: Delete ====== * 
   *                                    */

  RemoveLayer(idx: number): boolean {
    if (!this.IsValidIdx(idx)) return false;
    // remove from visible
    this.HideLayer(idx);
    // remove layer item
    this.items.splice(idx, 1);
    return true;
  }

  RemoveAllLayers(): void {
    this.items = [];
    this.visible = [];

  }

}
