import { TestBed } from '@angular/core/testing';

import { PdfUploadServiceService } from './pdf-upload-service.service';

describe('PdfUploadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfUploadServiceService = TestBed.get(PdfUploadServiceService);
    expect(service).toBeTruthy();
  });
});
