import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedListComponent } from './confirmed-list.component';

describe('ConfirmedListComponent', () => {
  let component: ConfirmedListComponent;
  let fixture: ComponentFixture<ConfirmedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
