import { TestBed, inject } from '@angular/core/testing';

import { AssessmentFormManagerService } from './assessment-form-manager.service';

describe('AssessmentFormManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentFormManagerService]
    });
  });

  it('should be created', inject([AssessmentFormManagerService], (service: AssessmentFormManagerService) => {
    expect(service).toBeTruthy();
  }));
});
