import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEditAdminComponent } from './home-edit-admin.component';

describe('HomeEditAdminComponent', () => {
  let component: HomeEditAdminComponent;
  let fixture: ComponentFixture<HomeEditAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEditAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
