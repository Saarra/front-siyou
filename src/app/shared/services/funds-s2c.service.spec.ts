import { TestBed } from '@angular/core/testing';

import { FundsS2cService } from './funds-s2c.service';

describe('FundsS2cService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundsS2cService = TestBed.get(FundsS2cService);
    expect(service).toBeTruthy();
  });
});
