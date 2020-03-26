import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { ImageEditorService } from '../../services/image-editor.service';
import { EditImageComponent } from './edit-image.component';

// class ImageEditorServiceMock extends ImageEditorService {
// canvasToBlob: (canvas: )=>{}
//   upload: () => {};
//   retryRetrieveDownloadUrls: () => {};
// }

fdescribe('EditImageComponent', () => {
  let component: EditImageComponent;
  let fixture: ComponentFixture<EditImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditImageComponent],
      providers: [
        {
          provide: ImageEditorService,
          useValue: jasmine.createSpyObj([
            'canvasToBlob',
            'upload',
            'retryRetrieveDownloadUrls',
            'createImageFromImageDataUrl',
            'canvasDraw'
          ])
        },
        { provide: MatBottomSheet, useValue: jasmine.createSpyObj(['open']) },
        { provide: MatDialog, useValue: {} },
        { provide: AngularFireStorage, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageComponent);
    component = fixture.componentInstance;
    // spyOnAllFunctions(TestBed.inject(ImageEditorService));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDownload', () => {
    it('should call openBottomSheet on success', () => {
      component.openBottomSheet = jasmine.createSpy('openBottomSheet');
      // const spy = spyOn(component, 'openBottomSheet').and.returnValue();
      // const imageEditorService = TestBed.inject(ImageEditorService);
      // jasmine.createSpy(component.ma, 'open');
      // spyOn(imageEditorService, 'upload').and.resolveTo();
      // spyOnAllFunctions(imageEditorService);
      // imageEditorService.canvasToBlob = jasmine.createSpy('canvasToBlob').and.resolveTo({} as Blob);
      // imageEditorService.upload = jasmine.createSpy('upload').and.resolveTo('id');
      // imageEditorService.retryRetrieveDownloadUrls = jasmine.createSpy('retryRetrieveDownloadUrls').and.resolveTo([]);
      component.onDownload();
      // expect(component.loading).toBe(false);
      // expect(component.openBottomSheet).toHaveBeenCalled();
    });

    xit('should call matDialog.open on error', () => {
      pending();
      const matDialogSpy = spyOn(component.matDialog, 'open');

      component.onDownload();

      expect(matDialogSpy).toHaveBeenCalled();
    });
  });
});
