import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteTestComponent } from './write-test.component';

describe('WriteTestComponent', () => {
  let component: WriteTestComponent;
  let fixture: ComponentFixture<WriteTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
