import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianAccountListComponent } from './physician-account-list.component';

describe('PhysicianAccountListComponent', () => {
  let component: PhysicianAccountListComponent;
  let fixture: ComponentFixture<PhysicianAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
