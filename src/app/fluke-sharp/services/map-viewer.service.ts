import { Injectable } from '@angular/core';
import { Map, TileLayer, Marker, LatLng, LeafletMouseEvent, Icon } from 'leaflet';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import * as Settings from '@FlukeSharp/services/leaflet-custom-settings';

@Injectable({
  providedIn: 'root'
})
export class MapViewerService {

  map!: Map;
  currentMapTile: TileLayer;
  overlayTiles: TileLayer[] = [];
  isNauticalChartVisible: boolean;
  mapTiles = Settings.MapTiles;
  picker: LatLng = new LatLng(0, 0);
  isPickPos: boolean = false;

  constructor(
    private layers: LayerManagerService
  ) {
    this.currentMapTile = Settings.options.layers[0];
    this.overlayTiles = Settings.options.layers.slice(1);
    this.isNauticalChartVisible = Settings.options.layers.includes(Settings.OpenSeaMap);
  }

  OnMapReady(map: Map) {
    this.map = map;

    // set default icon
    Icon.Default.prototype.options.iconSize = Settings.markerIcon.options.iconSize;
    Icon.Default.prototype.options.iconAnchor = Settings.markerIcon.options.iconAnchor;
    Icon.Default.prototype.options.iconUrl = Settings.markerIcon.options.iconUrl;
    Icon.Default.prototype.options.shadowSize = Settings.markerIcon.options.shadowSize;
    Icon.Default.prototype.options.shadowUrl = Settings.markerIcon.options.shadowUrl;
  }

  OnMapClick(e: LeafletMouseEvent) {
    this.picker.lat = e.latlng.lat;
    this.picker.lng = e.latlng.lng;

    if (this.isPickPos)
      this.layers.AddMarkerLayer(
        [e.latlng.lat, e.latlng.lng],
        "PickedMarker"
      );
  }

  GetInitialOption() {
    return Settings.options;
  }

  ToggleNauticalChartTiles() {
    if (this.isNauticalChartVisible) {
      this.map.removeLayer(Settings.OpenSeaMap);
      this.isNauticalChartVisible = false;
    }
    else {
      this.map.addLayer(Settings.OpenSeaMap);
      Settings.OpenSeaMap.bringToBack();
      this.currentMapTile.bringToBack();
      this.isNauticalChartVisible = true;
    }
  }

  ToggleMapTiles(newmaptile: TileLayer) {
    this.map.removeLayer(this.currentMapTile);
    this.currentMapTile = newmaptile
    this.map.addLayer(this.currentMapTile);
    this.currentMapTile.bringToBack();
  }

  SetView(latlng: LatLng, zoom?: number) { this.map.setView(latlng, zoom); }
  SetZoom(zoom: number) { this.map.setZoom(zoom) }


}
