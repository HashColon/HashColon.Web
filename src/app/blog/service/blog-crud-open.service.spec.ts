import { TestBed } from '@angular/core/testing';

import { BlogCrudOpenService } from './blog-crud-open.service';

describe('BlogCrudOpenService', () => {
  let service: BlogCrudOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogCrudOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
