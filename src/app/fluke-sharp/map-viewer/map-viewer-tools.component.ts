import { Component, OnInit } from '@angular/core';
import { MapViewerService } from '@FlukeSharp/services/map-viewer.service';
import { LatLng } from 'leaflet';

@Component({
  selector: 'fluke-map-viewer-tools',
  templateUrl: './map-viewer-tools.component.html',
  styleUrls: ['./map-viewer-tools.component.scss']
})
export class MapViewerToolsComponent implements OnInit {

  constructor(
    public action: MapViewerService
  ) { }

  ngOnInit(): void {
    // this.action.pushedAction.subscribe((actionName: string, param: LatLng) => {
    //   if (actionName == 'PositionPicked') {
    //     this.ShowPickedPosition(param);
    //   }      
    // });
  }

  ShowPickedPosition(param: LatLng) {

  }

}
