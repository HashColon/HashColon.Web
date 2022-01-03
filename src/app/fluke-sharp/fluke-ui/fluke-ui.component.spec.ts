import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlukeUIComponent } from './fluke-ui.component';

describe('FlukeUIComponent', () => {
  let component: FlukeUIComponent;
  let fixture: ComponentFixture<FlukeUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlukeUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlukeUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
