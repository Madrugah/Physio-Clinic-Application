import { TestBed, inject } from '@angular/core/testing';

import { AuthManageService } from './auth-manage.service';

describe('AuthManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthManageService]
    });
  });

  it('should be created', inject([AuthManageService], (service: AuthManageService) => {
    expect(service).toBeTruthy();
  }));
});
