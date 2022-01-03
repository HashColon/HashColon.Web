import { TestBed } from '@angular/core/testing';

import { BlogImageOpenService } from './blog-image-open.service';

describe('BlogImageOpenService', () => {
  let service: BlogImageOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogImageOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
