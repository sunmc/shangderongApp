import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAirPage } from './city-air.page';

describe('CityAirPage', () => {
  let component: CityAirPage;
  let fixture: ComponentFixture<CityAirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
