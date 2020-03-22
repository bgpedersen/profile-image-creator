import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { ImageEditorService } from './image-editor.service';

fdescribe('ImageEditorService', () => {
  let service: ImageEditorService;
  const angularFireStorageSpy = jasmine.createSpyObj('AngularFireStorage', ['ref']);
  // spyOn(angularFireStorageSpy, 'ref').and.returnValue(2);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageEditorService, { provide: AngularFireStorage, useValue: angularFireStorageSpy }]
    });

    service = TestBed.inject(ImageEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomId', () => {
    it('should get number', () => {
      const id = service.getRandomId();
      expect(id).toBeInstanceOf(String);
    });
  });

  xdescribe('upload', () => {
    it('should get id from upload', (done: DoneFn) => {
      const blob = new Blob();
      service.upload(blob).then(id => {
        expect(id).toBe(typeof String);
      });

      done();
    });
  });

  xdescribe('canvasToBlob', () => {
    it('should create blob from canvas', (done: DoneFn) => {
      const canvas = document.createElement('canvas');
      service.canvasToBlob(canvas).then(blob => {
        expect(blob).toBeDefined();
        done();
      });
    });
  });
});
