import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerEditorGeojsonComponent } from './layer-editor-geojson.component';

describe('LayerEditorGeojsonComponent', () => {
  let component: LayerEditorGeojsonComponent;
  let fixture: ComponentFixture<LayerEditorGeojsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerEditorGeojsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerEditorGeojsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
