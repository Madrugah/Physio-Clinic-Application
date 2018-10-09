import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientFormComponent } from './new-patient-form.component';

describe('NewPatientFormComponent', () => {
  let component: NewPatientFormComponent;
  let fixture: ComponentFixture<NewPatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
