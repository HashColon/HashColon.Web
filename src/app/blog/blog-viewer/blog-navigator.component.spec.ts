import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNavigatorComponent } from './blog-navigator.component';

describe('BlogNavigatorComponent', () => {
  let component: BlogNavigatorComponent;
  let fixture: ComponentFixture<BlogNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
