import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStepperComponent } from './create-stepper.component';

describe('CreateStepperComponent', () => {
  let component: CreateStepperComponent;
  let fixture: ComponentFixture<CreateStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
