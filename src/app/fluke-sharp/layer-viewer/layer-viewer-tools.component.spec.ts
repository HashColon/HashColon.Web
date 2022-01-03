import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerViewerToolsComponent } from './layer-viewer-tools.component';

describe('LayerViewerToolsComponent', () => {
  let component: LayerViewerToolsComponent;
  let fixture: ComponentFixture<LayerViewerToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerViewerToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerViewerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
