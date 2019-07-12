import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordHisProPage } from './record-his-pro.page';

describe('RecordHisProPage', () => {
  let component: RecordHisProPage;
  let fixture: ComponentFixture<RecordHisProPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordHisProPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordHisProPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
