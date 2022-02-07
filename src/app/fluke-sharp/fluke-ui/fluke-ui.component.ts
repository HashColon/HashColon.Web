import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';

import { LayerManagerService } from '@FlukeSharp/services/layer-manager.service';
import { LayerViewerService } from '@FlukeSharp/services/layer-viewer.service';
import { MapViewerService } from '@FlukeSharp/services/map-viewer.service';
import { FileExplorerService } from '@FlukeSharp/services/file-explorer.service';
import { Layer, LeafletMouseEvent, Map } from 'leaflet';


@Component({
  selector: 'fluke-ui',
  templateUrl: './fluke-ui.component.html',
  styleUrls: ['./fluke-ui.component.scss']
})
export class FlukeUIComponent implements AfterViewInit {
  // drag-resizable editor window
  @ViewChild('dragHandle') dragHandle: ElementRef = {} as ElementRef;
  dragHandleElement: HTMLElement;
  showDragHandle = true;
  editorOpened = true;
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
    private mapFunc: MapViewerService,
    private layers: LayerManagerService,
    private layersFunc: LayerViewerService,
    private fileExplorerFunc: FileExplorerService
  ) {
    this.dragHandleElement = this.dragHandle.nativeElement;
  }

  ngAfterViewInit(): void {
    this.dragHandleElement = this.dragHandle.nativeElement;
  }

  _getLeafletInitialOption() { return this.mapFunc.GetInitialOption(); }
  _onMapReady(map: Map) { this.mapFunc.OnMapReady(map); }
  _onMapClick(event: LeafletMouseEvent) { this.mapFunc.OnMapClick(event); }

  _getVisibleLayers(): Layer[] { return this.layers.visible; }








}
