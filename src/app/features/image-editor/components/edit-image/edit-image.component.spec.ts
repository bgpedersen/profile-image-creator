import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { ImageEditorService } from '../../services/image-editor.service';
import { EditImageComponent } from './edit-image.component';

describe('EditImageComponent', () => {
  let component: EditImageComponent;
  let fixture: ComponentFixture<EditImageComponent>;
  // define service, so it can be referenced from test blocks and to create spyObj on
  let imageEditorServiceSpy: jasmine.SpyObj<ImageEditorService>;

  beforeEach(async(() => {
    // create spy obj on the defined service from before. Cast the type to get auto complete on the fn names
    imageEditorServiceSpy = jasmine.createSpyObj<ImageEditorService>('ImageEditorService', [
      'canvasToBlob',
      'upload',
      'retryRetrieveDownloadUrls',
      'createImageFromImageDataUrl',
      'canvasDraw'
    ]);

    TestBed.configureTestingModule({
      declarations: [EditImageComponent],
      providers: [
        {
          provide: ImageEditorService,
          // use the spy service as value
          useValue: imageEditorServiceSpy
        },
        { provide: MatBottomSheet, useValue: {} },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
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

  describe('onDownload', () => {
    it('should call openBottomSheet on success', async () => {
      // using the declared spy service, with all the feedback on both the service and jasmine spy
      imageEditorServiceSpy.canvasToBlob.and.resolveTo({} as Blob);
      imageEditorServiceSpy.upload.and.resolveTo('id');
      imageEditorServiceSpy.retryRetrieveDownloadUrls.and.resolveTo([]);
      const spy = spyOn(component, 'openBottomSheet');

      await component.onDownload();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.matDialog.open).toHaveBeenCalledTimes(0);
    });

    it('should call matDialog.open on error', async () => {
      // using the declared spy service, with all the feedback on both the service and jasmine spy
      imageEditorServiceSpy.canvasToBlob.and.resolveTo({} as Blob);
      imageEditorServiceSpy.upload.and.resolveTo('id');
      imageEditorServiceSpy.retryRetrieveDownloadUrls.and.rejectWith();
      const spy = spyOn(component, 'openBottomSheet');

      await component.onDownload();

      expect(spy).toHaveBeenCalledTimes(0);
      expect(component.matDialog.open).toHaveBeenCalledTimes(1);
    });
  });
});
