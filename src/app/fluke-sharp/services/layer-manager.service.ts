import { Injectable } from '@angular/core';
import { Layer, LayerGroup, GeoJSON, Marker, Path, FeatureGroup } from 'leaflet';
import * as leafletSettings from '@FlukeSharp/services/leaflet-custom-settings';

export var LayerTypes: { [key: string]: any } = {
  'GeoJSON': GeoJSON,
  'Marker': Marker
};

@Injectable({
  providedIn: 'root'
})
export class LayerManagerService {

  labeled: { [key: string]: Layer } = {};
  userstyles: { [key: string]: any } = {};
  visible: Layer[] = [];
  autoStyle: boolean = false;

  constructor() {
  }

  stylefunc_Auto(val: number) {
    if (val < 0.0 || val > 1.0) {
      throw "layer-manager.service::stylefunc_Auto : given val is not in range [0,1]";
    }
    else {
      return () => {
        return {
          color: "hsl(" + (val * 360.0) + ", 100%, 40%) "
        };
      };
    }
  }

  stylefunc_Manual = (feature: any) => {
    if (feature.properties && feature.properties.style) {
      return feature.properties.style;
    }
    return leafletSettings.defaultPathStyles;
  }

  setAllGeoJsonStyles_Auto() {
    // count geojson layers in visibile
    var autostylecnt = 0;
    for (var label in this.labeled) {
      if (this.isVisible(label) && !this.hasUserStyle(label)) {
        autostylecnt++;
      }
    }

    var cnt = 0;
    for (var label in this.labeled) {
      if (this.isVisible(label) && !this.hasUserStyle(label)) {
        if (this.labeled[label] instanceof GeoJSON) {
          (this.labeled[label] as GeoJSON).setStyle(this.stylefunc_Auto(cnt / autostylecnt));
          cnt++
        }
      }
    }
  }

  setAllGeoJsonStyles_Manual() {
    for (var label in this.labeled) {
      if (this.labeled[label] instanceof GeoJSON) {
        if (this.hasUserStyle(label)) {
          (this.labeled[label] as GeoJSON).setStyle((feature) => this.userstyles[label]);
        }
        else {
          (this.labeled[label] as GeoJSON).setStyle(this.stylefunc_Manual);
        }
      }
    }
  }

  toggleStyle() {
    this.autoStyle = !this.autoStyle;
    if (this.autoStyle) {
      this.setAllGeoJsonStyles_Auto();
    }
    else {
      this.setAllGeoJsonStyles_Manual();
    }
  }

  // rename a layer
  renameLayer(label: string, newlabel: string): boolean {
    // if the name 'newlabel' is already occupied, return false
    if (this.hasLabel(newlabel)) {
      return false;
    }
    // move layer from label to newlabel
    this.labeled[newlabel] = this.labeled[label];
    delete this.labeled[label];

    // if user-style is defined, move it also.
    if (this.hasUserStyle(label)) {
      this.userstyles[newlabel] = this.userstyles[label];
      delete this.userstyles[label];
    }

    return true;
  }

  // generate random string of 5 character
  generateRandomName(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }

  // check if layer is visible 
  isVisible(label: string): boolean {
    return this.visible.indexOf(this.labeled[label]) >= 0;
  }

  // check if layer is in the manager service 
  hasLabel(label: string): boolean {
    return label in this.labeled;
  }

  hasUserStyle(label: string): boolean {
    return this.hasLabel(label) && (label in this.userstyles);
  }

  // remove layer from visible (not recommended to use this function. use toggleLayer instead.)
  hideLayer(label: string): boolean {
    if (this.hasLabel(label)) {
      this.visible.splice(
        this.visible.indexOf(this.labeled[label]), 1);
      return true;
    }
    else return false
  }

  // inserts a new layer. 
  // if a layer with the given label exists, does return true. else, return false.
  pushLayer(layer: Layer, label: string,
    options: { hide?: boolean; forced?: boolean } = { hide: false, forced: false },
    userstyle?: any): boolean {

    // trim label
    var newlabel: string = label === null ? '' : label.trim();

    // if the newlabel is a duplicate or newlabel is empty string,    
    if (this.hasLabel(newlabel) ||
      (!(label && label.trim().length))) {
      // if forced option is on, make a random name
      if (options.forced) {
        var temp_newlabel;
        do {
          temp_newlabel = newlabel + ((newlabel.length) ? '_' : '') + this.generateRandomName();
        } while (this.hasLabel(temp_newlabel));
      }
      // else do not insert and return.
      else {
        return false;
      }
    }

    // add new labeled layer
    this.labeled[newlabel] = layer;

    // if user style is given, add it
    if (userstyle) {
      this.userstyles[newlabel] = userstyle;
    }

    // if the layer is set as visible, make it visible.
    if (!options.hide) {
      this.visible.push(this.labeled[newlabel]);
    }

    // if autoStyle is on, apply it.
    if (this.autoStyle)
      this.setAllGeoJsonStyles_Auto();
    else
      this.setAllGeoJsonStyles_Manual();

    return true;
  }

  pushGeoJsonLayer(geoJsonObj: any, label: string,
    options: { hide?: boolean; forced?: boolean } = { hide: false, forced: false },
    userstyle?: any): boolean {
    // create a empty geojson layer 
    // return this.pushLayer(newlayer, label, options);
    return this.pushLayer(
      new GeoJSON(geoJsonObj,
        {
          // style: this.stylefunc_Manual,
          onEachFeature: (feature: any, layer) => {
            if (feature.properties.style) {
              if (layer instanceof Path || layer instanceof FeatureGroup || layer instanceof GeoJSON) {
                layer.setStyle(feature.properties.style);
              }
            }
          }
        }),
      label, options, userstyle);
  }

  pushUserStyle(userstyle: any, label: string) {
    if (this.hasLabel(label)) {
      this.userstyles[label] = userstyle;
      if (this.labeled[label] instanceof GeoJSON) {
        // first reset to initial state
        //(this.labeled[label] as GeoJSON).setStyle(this.stylefunc_Manual);
        // then change to user styles
        (this.labeled[label] as GeoJSON).setStyle(() => this.userstyles[label]);
      }
      return true;
    }
    else return false;
  }

  editUserStyle(userstyle: any, label: string) {
    return this.pushUserStyle(userstyle, label);
  }

  removeUserStyle(label: string) {
    if (this.hasUserStyle(label)) {
      delete this.userstyles[label];

      if (this.labeled[label] instanceof GeoJSON) {
        (this.labeled[label] as GeoJSON).setStyle(this.stylefunc_Manual);
      }

      return true;
    }
    else return false;
  }

  // edits a existing layer. 
  // if a layer with the given label exists, return true. else, return false.
  editLayer(layer: Layer, label: string): boolean {

    if (!this.hasLabel(label)) {
      return false;
    }
    else {

      // if the layer is type of layer group, edit the layer inside the group
      if (this.labeled[label] instanceof LayerGroup) {
        (this.labeled[label] as LayerGroup).clearLayers();
        (this.labeled[label] as LayerGroup).addLayer(layer);
      }

      // if autoStyle is on, apply it.
      if (this.autoStyle)
        this.setAllGeoJsonStyles_Auto();
      else
        this.setAllGeoJsonStyles_Manual();

      return true;
    }
  }

  editGeoJsonLayer(geoJsonObj: any, label: string) {

    if (!this.hasLabel(label)) {
      return false;
    }
    else if (this.labeled[label] instanceof GeoJSON) {

      (this.labeled[label] as GeoJSON).clearLayers();
      (this.labeled[label] as GeoJSON).addData(geoJsonObj);

      // if autoStyle is on, apply it.
      if (this.autoStyle)
        this.setAllGeoJsonStyles_Auto();
      else
        this.setAllGeoJsonStyles_Manual();

      return true;
    }
    else return false;
  }

  // remove layer with the given label
  // if a layer with the given label exists, return true. else, return false.
  removeLayer(label: string): boolean {
    if (this.hasLabel(label)) {
      if (this.isVisible(label)) {
        this.hideLayer(label);
      }
      delete this.labeled[label];

      // if userstyle exists, remove it
      if (this.hasUserStyle(label)) {
        delete this.userstyles[label];
      }

      // if autoStyle is on, recompute colors and apply them.
      if (this.autoStyle) this.setAllGeoJsonStyles_Auto();
      return true;
    }
    else return false;
  }

  // make it visible if not, hide it if not visible
  // if a layer with the given label does not exists, return false. 
  toggleLayer(label: string): boolean {
    var re = false;
    if (this.hasLabel(label)) {
      if (this.isVisible(label)) {
        this.hideLayer(label);
      }
      else {
        this.visible.push(this.labeled[label]);
      }
      re = true;
    }
    // if autoStyle is on, recompute colors and apply them.
    if (this.autoStyle) this.setAllGeoJsonStyles_Auto();
    return re;
  }

  clearAll(): void {
    //delete this.visible;
    this.visible = [];
    //delete this.labeled;
    this.labeled = {};
    this.userstyles = {};
  }

  hideAll(): void {
    //delete this.visible;
    this.visible = [];
  }

  showAll(): void {
    for (var key of Object.keys(this.labeled)) {
      if (!this.isVisible(key)) {
        this.toggleLayer(key);
      }
    }
    // if autoStyle is on, apply it.
    if (this.autoStyle) this.setAllGeoJsonStyles_Auto();
  }

}
