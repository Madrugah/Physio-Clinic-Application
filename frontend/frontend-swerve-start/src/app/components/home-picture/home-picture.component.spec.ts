import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePictureComponent } from './home-picture.component';

describe('HomePictureComponent', () => {
  let component: HomePictureComponent;
  let fixture: ComponentFixture<HomePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
