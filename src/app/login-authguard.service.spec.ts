import { TestBed } from '@angular/core/testing';

import { LoginAuthguardService } from './login-authguard.service';

describe('LoginAuthguardService', () => {
  let service: LoginAuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
