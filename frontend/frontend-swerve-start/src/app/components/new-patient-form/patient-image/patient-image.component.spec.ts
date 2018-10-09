import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientImageComponent } from './patient-image.component';

describe('PatientImageComponent', () => {
  let component: PatientImageComponent;
  let fixture: ComponentFixture<PatientImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
