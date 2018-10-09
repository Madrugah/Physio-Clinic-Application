import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhysComponent } from './create-phys.component';

describe('CreatePhysComponent', () => {
  let component: CreatePhysComponent;
  let fixture: ComponentFixture<CreatePhysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePhysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
