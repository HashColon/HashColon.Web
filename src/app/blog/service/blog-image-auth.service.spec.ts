import { TestBed } from '@angular/core/testing';

import { BlogImageAuthService } from './blog-image-auth.service';

describe('BlogImageAuthService', () => {
  let service: BlogImageAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogImageAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
