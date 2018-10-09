import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentsComponent } from './client-appointments.component';

describe('ClientAppointmentsComponent', () => {
  let component: ClientAppointmentsComponent;
  let fixture: ComponentFixture<ClientAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
