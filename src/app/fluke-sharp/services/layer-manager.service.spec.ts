import { TestBed } from '@angular/core/testing';

import { LayerManagerService } from './layer-manager.service';

describe('LayerManagerService', () => {
  let service: LayerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
