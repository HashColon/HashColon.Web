# HashColon.Web

This project consists of two distinct subprojects: 
* FlukeSharp: Web viewer for nautical routes and other maritime information based on geojson data
* Blog: My blog with self-built blog engine based on Firebase services

## FlukeSharp

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