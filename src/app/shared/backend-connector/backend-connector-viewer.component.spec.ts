import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendConnectorViewerComponent } from './backend-connector-viewer.component';

describe('BackendConnectorViewerComponent', () => {
  let component: BackendConnectorViewerComponent;
  let fixture: ComponentFixture<BackendConnectorViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendConnectorViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendConnectorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
