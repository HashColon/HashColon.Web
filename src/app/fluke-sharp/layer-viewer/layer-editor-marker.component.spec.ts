import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerEditorMarkerComponent } from './layer-editor-marker.component';

describe('LayerEditorMarkerComponent', () => {
  let component: LayerEditorMarkerComponent;
  let fixture: ComponentFixture<LayerEditorMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerEditorMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerEditorMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
