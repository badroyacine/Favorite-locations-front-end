import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfosComponent } from './update-user-infos.component';

describe('UpdateUserInfosComponent', () => {
  let component: UpdateUserInfosComponent;
  let fixture: ComponentFixture<UpdateUserInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
