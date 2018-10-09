import { TestBed, inject } from '@angular/core/testing';

import { ManageExerciseService } from './manage-exercise.service';

describe('ManageExerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageExerciseService]
    });
  });

  it('should be created', inject([ManageExerciseService], (service: ManageExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
