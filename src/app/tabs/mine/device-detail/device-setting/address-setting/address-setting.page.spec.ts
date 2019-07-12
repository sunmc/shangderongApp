import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSettingPage } from './address-setting.page';

describe('AddressSettingPage', () => {
  let component: AddressSettingPage;
  let fixture: ComponentFixture<AddressSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
