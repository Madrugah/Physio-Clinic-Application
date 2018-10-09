import { TestBed, inject } from '@angular/core/testing';

import { PatientFunctionsManageService } from './patient-functions-manage.service';

describe('PatientFunctionsManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientFunctionsManageService]
    });
  });

  it('should be created', inject([PatientFunctionsManageService], (service: PatientFunctionsManageService) => {
    expect(service).toBeTruthy();
  }));
});
