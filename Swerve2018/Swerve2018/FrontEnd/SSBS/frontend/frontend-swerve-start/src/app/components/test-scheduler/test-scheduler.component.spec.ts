import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSchedulerComponent } from './test-scheduler.component';

describe('TestSchedulerComponent', () => {
  let component: TestSchedulerComponent;
  let fixture: ComponentFixture<TestSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
