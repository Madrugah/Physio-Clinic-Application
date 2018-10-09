import { TestBed, inject } from '@angular/core/testing';

import { PhysicianManageProfileService } from './physician-manage-profile.service';

describe('PhysicianManageProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhysicianManageProfileService]
    });
  });

  it('should be created', inject([PhysicianManageProfileService], (service: PhysicianManageProfileService) => {
    expect(service).toBeTruthy();
  }));
});
