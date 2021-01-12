import { TestBed } from '@angular/core/testing';

import { SupplierS2cService } from './supplier-s2c.service';

describe('SupplierS2cService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierS2cService = TestBed.get(SupplierS2cService);
    expect(service).toBeTruthy();
  });
});
