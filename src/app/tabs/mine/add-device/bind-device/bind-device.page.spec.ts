import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindDevicePage } from './bind-device.page';

describe('BindDevicePage', () => {
  let component: BindDevicePage;
  let fixture: ComponentFixture<BindDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindDevicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
