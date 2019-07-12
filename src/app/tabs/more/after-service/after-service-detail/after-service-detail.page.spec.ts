import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterServiceDetailPage } from './after-service-detail.page';

describe('AfterServiceDetailPage', () => {
  let component: AfterServiceDetailPage;
  let fixture: ComponentFixture<AfterServiceDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterServiceDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterServiceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
