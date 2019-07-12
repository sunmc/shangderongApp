import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindpwdPage } from './findpwd.page';

describe('ProtocolPage', () => {
  let component: FindpwdPage;
  let fixture: ComponentFixture<FindpwdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindpwdPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindpwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
