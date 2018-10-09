import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDialogComponent } from './scheduler-dialog.component';

describe('SchedulerDialogComponent', () => {
  let component: SchedulerDialogComponent;
  let fixture: ComponentFixture<SchedulerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
