import { TestBed } from '@angular/core/testing';

import { ShopmanagerService } from './shopmanager.service';

describe('ShopmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopmanagerService = TestBed.get(ShopmanagerService);
    expect(service).toBeTruthy();
  });
});
