import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedDialogDefaultComponent } from './shared-dialog-default.component';

describe('SharedDialogDefaultComponent', () => {
  let component: SharedDialogDefaultComponent;
  let fixture: ComponentFixture<SharedDialogDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedDialogDefaultComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { title: 'title', content: 'content', cancel: 'cancel', ok: 'ok' } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDialogDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
