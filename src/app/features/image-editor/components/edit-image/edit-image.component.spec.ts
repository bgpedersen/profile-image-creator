import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { EditImageComponent } from './edit-image.component';

class ImageEditorService {}

describe('EditImageComponent', () => {
  let component: EditImageComponent;
  let fixture: ComponentFixture<EditImageComponent>;

  const imageEditorService = new ImageEditorService();
  spyOnAllFunctions(imageEditorService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditImageComponent],
      providers: [
        { provide: ImageEditorService, useValue: imageEditorService },
        { provide: MatBottomSheet, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: AngularFireStorage, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
