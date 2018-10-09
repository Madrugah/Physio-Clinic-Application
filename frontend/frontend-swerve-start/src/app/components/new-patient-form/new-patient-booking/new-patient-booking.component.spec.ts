import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientBookingComponent } from './new-patient-booking.component';

describe('NewPatientBookingComponent', () => {
  let component: NewPatientBookingComponent;
  let fixture: ComponentFixture<NewPatientBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatientBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatientBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
