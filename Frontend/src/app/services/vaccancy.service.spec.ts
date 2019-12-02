import { TestBed } from '@angular/core/testing';

import { VaccancyService } from './vaccancy.service';

describe('VaccancyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VaccancyService = TestBed.get(VaccancyService);
    expect(service).toBeTruthy();
  });
});
