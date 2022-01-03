import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Map, LeafletMouseEvent, TileLayer } from 'leaflet';

import { TileLayerSrcs } from '@FlukeSharp/services/leaflet-custom-settings';
import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';
import { MapViewerService } from '@FlukeSharp/services/map-viewer.service';
import { FileExplorerService } from '@FlukeSharp/services/file-explorer.service';


@Component({
  selector: 'fluke-ui',
  templateUrl: './fluke-ui.component.html',
  styleUrls: ['./fluke-ui.component.scss']
})
export class FlukeUIComponent implements AfterViewInit {
  // drag-resizable editor window
  @ViewChild('dragHandle') dragHandle: ElementRef = {} as ElementRef;
  dragHandleElement: HTMLElement;
  showDragHandle = false;
  editorOpened = false
  editorWindowWidth = "300px";

  _dragToResizeEditor(e: CdkDragMove) {
    this.ngZone.runOutsideAngular(() => { this.ResizeEditor(e.distance.x) });
  }

  ResizeEditor(delta: number) {
    this.dragHandleElement = this.dragHandle.nativeElement;
    const dragHandleRect = this.dragHandleElement.getBoundingClientRect();
    this.editorWindowWidth = "calc(100vw - " + dragHandleRect.right + "px)";
  }

  _finishedToggle() {
    if (!this.showDragHandle && this.editorOpened)
      this.showDragHandle = !this.showDragHandle;
  }

  _startClosing() {
    if (this.showDragHandle)
      this.showDragHandle = !this.showDragHandle;
  }

  // leaflet map & underlying services    

  // Flukesharp Functions
  currentFunction: string = '';
  get functionTypes(): string[] {
    return [
      "Map", "Layers", "File explorer"
    ]
  }

  SetFunction(funcName: string) {
    if (this.currentFunction == funcName)
      this.currentFunction = '';
    else
      this.currentFunction = funcName;
  }

  // loading 
  _isLoading() {
    return this.layersFunc.isLoading || this.fileExplorerFunc._isLoading();
  }

  // constructor, ng-lifecycle hooks
  constructor(
    private ngZone: NgZone,
    public mapFunc: MapViewerService,
    public layers: LayerManagerService,
    public layersFunc: LayerViewerService,
    private fileExplorerFunc: FileExplorerService
  ) {
    this.dragHandleElement = this.dragHandle.nativeElement;
  }

  ngAfterViewInit(): void {
    this.dragHandleElement = this.dragHandle.nativeElement;

  }








}
