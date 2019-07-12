import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordHisPage } from './record-his.page';

describe('RecordHisPage', () => {
  let component: RecordHisPage;
  let fixture: ComponentFixture<RecordHisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordHisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordHisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
