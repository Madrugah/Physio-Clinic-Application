import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSchedulerComponent } from './client-scheduler.component';

describe('ClientSchedulerComponent', () => {
  let component: ClientSchedulerComponent;
  let fixture: ComponentFixture<ClientSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
