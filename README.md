# HashColon.Web

__VISIT:__ https://hashcolon-wchyoo.web.app/ 

This project consists of two distinct subprojects: 
* FlukeSharp: Web viewer for nautical routes and other maritime information based on geojson data
* Blog: My blog with self-built blog engine based on Firebase services

## FlukeSharp

### Releases

* May.11, 2022
    * Layer drag & drop  
    Now, layers can be drag and dropped in the layer panel. The order of the layers now affect the overlaying order(z-index).        
    * Bug fix: 
        * Bugs in editing markers, GeoJSON is now fixed. 
        * LayerManager is now rewritten to get rid of those spaghetti.  
        __SPAGHETTI GO TO HELL!!__ 
        * Layer indexing logic is changed. Layers are not indexed by their labels anymore. So, now layers can have duplicate labels.
        * And... some other minor bugs are fixed.
        * Longitude/latitude range in marker editor UI is fixed.

* Apr.30, 2022
    * GeoJSON styling approved: Now, styles are applied by each GeoJSON "feature".
        * Styles can be now implemented inside GeoJSON.
        * Refer to __Path options__ at https://leafletjs.com/reference.html#path 
        * In-code styling example:
        ```json
        {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "style": {"color": "#FFFFFF"}
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [ 
                            /* .... */
                        ]
                    }
                }
            ]
        }
        ```
        * Minor changes in layer managing codes.        

* Feb.07, 2022
    * Custom layer styling: Can add user-defined styles to layers. Custom styling ignores auto-coloring.
        * Refer to __Path options__ at https://leafletjs.com/reference.html#path 
        * Styling example:
        
        `{
            "color": "#663399", 
            "weight": 3
        }`
        
    * __Go to__ function implemented
        * Map => (bottom tool bar) Go to
        * Give latitude and longitude to move the center of the view. __Latitude should come first!__ All following examples are available: 
            `38, 127`
            `[38, 127]`
            `{38, 127}`
            `(38, 127)`
        * Map scaling can be done with the keyword "zoom:". Larger the number, more the map is zoomed.            
            'zoom: 3'
        * Move & zoom can be done at once.
            `38, 127 zoom: 3
    * UI change
        * Now, side window is opened at start.
        * Flukesharp server can be disconnected
    * Bug fix
        * Fixed minor errors in layer auto-coloring
        * All public angular services in components are changed into private services.    
        
* Jan.17, 2022
    * UI change: bottom icon tool bars
    * Lazy loading for leaflet layers.
    * Various map tiles applied.
    * Control menu removed.

### Prerequisites

* Angular(https://angular.io/)
* Angular Material (https://material.angular.io/)
* Leaflet (https://leafletjs.com/) + @asymmetrik/ngx-leaflet(https://github.com/Asymmetrik/ngx-leaflet)
* geojson-validation (https://www.npmjs.com/package/geojson-validation)

* Firebase authentication (can be replaced with othr authentication services)

### Functions

* Visualize position marker, geojson data by layers.
    * Upload geojson files
    * Auto-coloring layers
    * Realtime/WYSIWYG geojson/marker modification with geojson validation
    * Change background maptiles
* Get geojson files from flukesharp-servers (https://github.com/HashColon/FlukeSharpServer)

## HashColon.Blog

Blog engine based on Firebase.Database & Firebase.Storage. 

### Releases 

* Feb.07, 2022
    * All public angular services in components are changed into private services.

* Jan.17, 2022: Initial Release

### Prerequisites

* Angular(https://angular.io/)
* Angular Material (https://material.angular.io/)
* AngularFire (https://github.com/angular/angularfire, https://firebase.google.com/)
* CodeMirror 6 (https://codemirror.net/6/)
* highlight.js (https://highlightjs.org/)
* ngx-markdown (https://github.com/jfcere/ngx-markdown)

### Functions

* Create/Read/Update/Delete blog page in markdown with meta data (using Firebase.Database).
* Read and attach image to blog page (using Firebase.Storage).
* WYSIWYG Markdown edit UI for blog page.
* Code highlighting in blog page. 