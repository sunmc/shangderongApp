import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ProtocolPage} from './protocol.page';

describe('ProtocolPage', () => {
  let component: ProtocolPage;
  let fixture: ComponentFixture<ProtocolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProtocolPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
