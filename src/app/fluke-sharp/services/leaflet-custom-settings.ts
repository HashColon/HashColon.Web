import { LatLng, TileLayer, Icon } from 'leaflet';

export var googleMaps = new TileLayer(
    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
});

var OpenStreetMap = new TileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var CartoDark = new TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by &copy;<a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL. '
});

var CartoDarkNoLabel = new TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by &copy;<a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL. '
});

var CartoLight = new TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by &copy;<a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL. '
});

var CartoLightNoLabel = new TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by &copy;<a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL. '
});

var StamenTerrain = new TileLayer(
    'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
});

var StamenTerrainBg = new TileLayer(
    'https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
});

var StamenToner = new TileLayer(
    'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
});

var StamenTonerBg = new TileLayer(
    'https://stamen-tiles.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
});

var StamenTonerLite = new TileLayer(
    'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
});


export var OpenSeaMap = new TileLayer(
    'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: 'Nautical charts by <a href="http://www.openseamap.org/">OpenSeaMap</a>, under <a href="http://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>.'
});


export type TileLayerSrcs = {
    [src: string]: TileLayer
};

export var MapTiles: TileLayerSrcs = {
    'OpenStreetMap': OpenStreetMap,

    'Carto.Dark': CartoDark,
    'Carto.Dark.NoLabel': CartoDarkNoLabel,
    'Carto.Light': CartoLight,
    'Carto.Light.NoLabel': CartoLightNoLabel,

    'Stamen.Terrain': StamenTerrain,
    'Stamen.Terrain.Background': StamenTerrainBg,
    'Stamen.Toner': StamenToner,
    'Stamen.Toner.Background': StamenTonerBg,
    'Stamen.Toner.Lite': StamenTonerLite
}

export var options = {
    layers: [CartoDarkNoLabel, OpenSeaMap],
    zoom: 7,
    center: new LatLng(36, 127)
};

export var markerIcon = new Icon({
    iconSize: [12.5, 20.5],
    iconAnchor: [6.25, 20.5],
    iconUrl: 'marker-icon.png',
    shadowSize: [20.5, 20.5],
    shadowUrl: 'marker-shadow.png'
});

export var defaultPathStyles = {
    color: '#FF00AA',
    weight: 1
};
