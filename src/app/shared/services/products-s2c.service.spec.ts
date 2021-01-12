import { TestBed } from '@angular/core/testing';

import { ProductsS2cService } from './products-s2c.service';

describe('ProductsS2cService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsS2cService = TestBed.get(ProductsS2cService);
    expect(service).toBeTruthy();
  });
});
