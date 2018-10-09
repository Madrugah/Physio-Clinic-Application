import { TestBed, inject } from '@angular/core/testing';

import { QuestionMakerService } from './question-maker.service';

describe('QuestionMakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionMakerService]
    });
  });

  it('should be created', inject([QuestionMakerService], (service: QuestionMakerService) => {
    expect(service).toBeTruthy();
  }));
});
