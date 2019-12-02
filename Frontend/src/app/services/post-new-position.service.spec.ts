import { TestBed } from '@angular/core/testing';

import { PostNewPositionService } from './post-new-position.service';

describe('PostNewPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostNewPositionService = TestBed.get(PostNewPositionService);
    expect(service).toBeTruthy();
  });
});
