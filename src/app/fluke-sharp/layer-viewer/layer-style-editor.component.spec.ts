import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerStyleEditorComponent } from './layer-style-editor.component';

describe('LayerStyleEditorComponent', () => {
  let component: LayerStyleEditorComponent;
  let fixture: ComponentFixture<LayerStyleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerStyleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerStyleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
