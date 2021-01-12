import { TestBed } from '@angular/core/testing';

import { SalesmanagerService } from './salesmanager.service';

describe('SalesmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesmanagerService = TestBed.get(SalesmanagerService);
    expect(service).toBeTruthy();
  });
});
