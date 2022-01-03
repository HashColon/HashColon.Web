import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogHomeItemComponent } from './blog-home-item.component';

describe('BlogHomeItemComponent', () => {
  let component: BlogHomeItemComponent;
  let fixture: ComponentFixture<BlogHomeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogHomeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogHomeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
