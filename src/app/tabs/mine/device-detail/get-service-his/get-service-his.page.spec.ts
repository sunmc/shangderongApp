import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetServiceHisPage } from './get-service-his.page';

describe('GetServiceHisPage', () => {
  let component: GetServiceHisPage;
  let fixture: ComponentFixture<GetServiceHisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetServiceHisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetServiceHisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
