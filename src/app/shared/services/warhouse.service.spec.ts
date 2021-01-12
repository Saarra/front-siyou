import { TestBed } from '@angular/core/testing';

import { WarhouseService } from './warhouse.service';

describe('WarhouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarhouseService = TestBed.get(WarhouseService);
    expect(service).toBeTruthy() ;
  });
});
