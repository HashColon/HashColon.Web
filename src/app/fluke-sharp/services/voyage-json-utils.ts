import { LayerGroup, Polyline, Marker, Polygon } from 'leaflet';

export interface VJsonDynamicItem {
    position: { lat: number, lon: number };
    timestamp?: number;
    velocity: { speed: number, angle: number };
    xtd?: { portside: number, starboard: number };
}

export interface VJsonStatic {
    mmsi?: number;
    imo?: number;
    shipname?: string;
    Dim_L?: number;
    Dim_B?: number;
    Dim_T?: number;
    Dim_D?: number;
}
export interface VJsonRoute {
    static: VJsonStatic;
    dynamic: VJsonDynamicItem[];
}

export interface VoyageJson {
    voyages: VJsonRoute[];
}

function BuildLayer_Path(vjson: VoyageJson, pathStyle: any, staticInfoStyle: any): LayerGroup {
    var re: LayerGroup;

    // for each voyage
    for (var voyage of vjson.voyages) {
        // get coordinates of waypoints
        var latlng = [];
        for (var wp of voyage.dynamic) {
            latlng.push([wp.position.lat, wp.position.lon]);
        }
        // set polyline layers
        var polylineLayer = new Polyline(latlng, pathStyle);

        // set static data
        var tooltipText = "<Static Data>\n";
        for (var key of Object.keys(voyage.static)) {
            tooltipText += (key + ": " + voyage.static[key] + "/n");
        }
        polylineLayer.bindPopup(tooltipText);
        re.addLayer(polylineLayer);
    }

    return re;
}

function BuildLayer_WP(vjson: VoyageJson, markerStyle: any, tooltipStyle: any): LayerGroup {
    var re: LayerGroup;

    // for each voyage
    for (var voyage of vjson.voyages) {
        // get coordinates of waypoints
        for (var wp of voyage.dynamic) {
            // add marker layer
            var pointLayer = new Marker([wp.position.lat, wp.position.lon], markerStyle);
            // add tooltip
            var tooltip: string = "";
            for (var key of Object.keys(wp)) {
                tooltip += (key + ": " + wp[key].toString() + "\n");
            }
            pointLayer.bindTooltip(tooltip, tooltipStyle);
            // push layer
            re.addLayer(pointLayer);
        }
    }
    return re;
}

function GetXtdBox(s: VJsonDynamicItem, e: VJsonDynamicItem, style: any) {
    const LonUnitDist = 88.74 * 1000; // 88.74km per longitude 1 degree (near Korea penninsula)
    const LatUnitDist = 109.96 * 1000; // 109.96km per latitude 1 degree (near Korea penninsula)

    // Function form feline engine 
    var AngleTo = (ps: VJsonDynamicItem, pe: VJsonDynamicItem) => {
        var e_minus_s = [
            (pe.position.lat - ps.position.lat) * LatUnitDist,
            (pe.position.lon - pe.position.lon) * LonUnitDist
        ];
        var dist = Math.sqrt(e_minus_s[0] * e_minus_s[0] + e_minus_s[1] * e_minus_s[1]);
        return (e_minus_s[0] >= 0) ?
            Math.acos(e_minus_s[1] / dist) :
            2 * Math.PI - Math.acos(e_minus_s[1] / dist);
    };

    var MoveTo = (ps: VJsonDynamicItem, angle: number, distance: number) => {
        var re = [0, 0];
        re[0] = ps.position.lat + distance * Math.sin(angle) / LatUnitDist;
        re[1] = ps.position.lat + distance * Math.cos(angle) / LatUnitDist;

        return re;

    }

    var se_angle = AngleTo(s, e);
    var s_p = MoveTo(s, se_angle - Math.PI / 2, s.xtd.portside);
    var e_p = MoveTo(e, se_angle - Math.PI / 2, e.xtd.portside);
    var e_s = MoveTo(e, se_angle + Math.PI / 2, e.xtd.starboard);
    var s_s = MoveTo(s, se_angle + Math.PI / 2, s.xtd.starboard);
    var latlngs = [
        [s.position.lat, s.position.lon], [s_p[0], s_p[1]], [e_p[0], e_p[1]],
        [e.position.lat, e.position.lon], [e_s[0], e_s[1]], [s_s[0], s_s[1]]
    ];

    return new Polygon(latlngs, style);
}

function BuildLayer_XTDArea(vjson: VoyageJson, style: any): LayerGroup {
    var re: LayerGroup;

    // for each voyage
    for (var voyage of vjson.voyages) {
        var latlngs = [];
        var isXTDvalid = true;
        var XtdLayers: LayerGroup;

        for (var i = 0; i < voyage.dynamic.length; i++) {
            // if xtd is not defined ignore,
            if (voyage.dynamic[i].xtd == null || voyage.dynamic[i].xtd == undefined) continue;

            // if end point, 
            if (i == (voyage.dynamic.length - 1)) {
                XtdLayers.addLayer(GetXtdBox(voyage.dynamic[i], voyage.dynamic[i], style));
            }
            else {
                XtdLayers.addLayer(GetXtdBox(voyage.dynamic[i], voyage.dynamic[i + 1], style));
            }
        }
        re.addLayer(XtdLayers);
    }
    return re;
}

export function Convert_VJson2Leaflet(vjson: VoyageJson, styles: any): LayerGroup {
    var re: LayerGroup;

    // Draw path
    re.addLayer(
        BuildLayer_Path(vjson,
            (styles.Path ? styles.Path : null),
            (styles.Static ? styles.Static : null)
        )
    );

    // Draw wps
    re.addLayer(
        BuildLayer_WP(vjson,
            (styles.WPMarker ? styles.WPMarker : null),
            (styles.WPTooltip ? styles.WPTooltip : null)
        )
    );

    // Draw XTD Area
    re.addLayer(
        BuildLayer_XTDArea(vjson, (styles.XTDArea ? styles.XTDArea : null))
    );
}

export function Convert_VJson2GeoJson(vjson: VoyageJson): any {

}