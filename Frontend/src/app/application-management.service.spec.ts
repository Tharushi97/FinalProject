import { TestBed } from '@angular/core/testing';

import { ApplicationManagementService } from './application-management.service';

describe('ApplicationManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationManagementService = TestBed.get(ApplicationManagementService);
    expect(service).toBeTruthy();
  });
});
