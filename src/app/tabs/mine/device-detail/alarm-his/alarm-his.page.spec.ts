import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmHisPage } from './alarm-his.page';

describe('AlarmHisPage', () => {
  let component: AlarmHisPage;
  let fixture: ComponentFixture<AlarmHisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmHisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmHisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
