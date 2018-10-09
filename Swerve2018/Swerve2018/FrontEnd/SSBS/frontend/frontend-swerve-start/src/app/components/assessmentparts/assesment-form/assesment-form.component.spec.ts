import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentFormComponent } from './assesment-form.component';

describe('AssesmentFormComponent', () => {
  let component: AssesmentFormComponent;
  let fixture: ComponentFixture<AssesmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
