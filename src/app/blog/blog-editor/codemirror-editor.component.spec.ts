import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemirrorEditorComponent } from './codemirror-editor.component';

describe('CodemirrorEditorComponent', () => {
  let component: CodemirrorEditorComponent;
  let fixture: ComponentFixture<CodemirrorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodemirrorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodemirrorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
