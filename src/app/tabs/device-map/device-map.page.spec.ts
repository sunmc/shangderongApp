import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMapPage } from './device-map.page';

describe('DeviceMapPage', () => {
  let component: DeviceMapPage;
  let fixture: ComponentFixture<DeviceMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
