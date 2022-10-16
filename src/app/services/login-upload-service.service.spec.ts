import { TestBed } from '@angular/core/testing';

import { LoginUploadServiceService } from './login-upload-service.service';

describe('LoginUploadServiceService', () => {
  let service: LoginUploadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUploadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
