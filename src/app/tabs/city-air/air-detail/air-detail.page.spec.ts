import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirDetailPage } from './air-detail.page';

describe('AirDetailPage', () => {
  let component: AirDetailPage;
  let fixture: ComponentFixture<AirDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
