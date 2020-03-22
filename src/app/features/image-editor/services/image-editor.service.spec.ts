import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { ImageEditorService } from './image-editor.service';

class AngularFireStorageMock {
  ref = (path: string) => {
    return {
      put: (blob: Blob) => {
        return new Promise(resolve => {
          resolve({ metadata: { name: 'test.me' } });
        });
      }
    };
  };
}

fdescribe('ImageEditorService', () => {
  let service: ImageEditorService;
  const afStorage = new AngularFireStorageMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageEditorService, { provide: AngularFireStorage, useValue: afStorage }]
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

  describe('upload', () => {
    it('should get id from upload', (done: DoneFn) => {
      service.upload({} as Blob).then(id => {
        expect(id).toBe('test');
        done();
      });
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
