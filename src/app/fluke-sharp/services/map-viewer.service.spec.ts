import { TestBed } from '@angular/core/testing';

import { MapViewerService } from './map-viewer.service';

describe('MapViewerService', () => {
  let service: MapViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
