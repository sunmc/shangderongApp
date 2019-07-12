import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterServicePage } from './after-service.page';

describe('AfterServicePage', () => {
  let component: AfterServicePage;
  let fixture: ComponentFixture<AfterServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
