import { TestBed, inject } from '@angular/core/testing';

import { RehabPlanManagerService } from './rehab-plan-manager.service';

describe('RehabPlanManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RehabPlanManagerService]
    });
  });

  it('should be created', inject([RehabPlanManagerService], (service: RehabPlanManagerService) => {
    expect(service).toBeTruthy();
  }));
});
