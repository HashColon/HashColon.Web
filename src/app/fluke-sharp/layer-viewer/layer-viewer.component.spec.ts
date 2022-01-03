import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerViewerComponent } from './layer-viewer.component';

describe('LayerViewerComponent', () => {
  let component: LayerViewerComponent;
  let fixture: ComponentFixture<LayerViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
