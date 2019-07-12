import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirChartPage } from './air-chart.page';

describe('AirChartPage', () => {
  let component: AirChartPage;
  let fixture: ComponentFixture<AirChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirChartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
