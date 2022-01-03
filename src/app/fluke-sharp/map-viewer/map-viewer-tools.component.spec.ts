import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewerToolsComponent } from './map-viewer-tools.component';

describe('MapViewerToolsComponent', () => {
  let component: MapViewerToolsComponent;
  let fixture: ComponentFixture<MapViewerToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapViewerToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapViewerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
