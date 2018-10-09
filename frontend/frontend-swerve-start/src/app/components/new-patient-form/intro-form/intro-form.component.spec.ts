import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroFormComponent } from './intro-form.component';

describe('IntroFormComponent', () => {
  let component: IntroFormComponent;
  let fixture: ComponentFixture<IntroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
