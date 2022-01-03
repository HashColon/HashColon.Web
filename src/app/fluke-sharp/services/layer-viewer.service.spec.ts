import { TestBed } from '@angular/core/testing';

import { LayerViewerService } from './layer-viewer.service';

describe('LayerViewerService', () => {
  let service: LayerViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayerViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
