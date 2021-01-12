import { TestBed } from '@angular/core/testing';

import { LevelmembershipService } from './levelmembership.service';

describe('LevelmembershipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelmembershipService = TestBed.get(LevelmembershipService);
    expect(service).toBeTruthy();
  });
});
