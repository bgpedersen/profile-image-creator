import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { ImageEditorService } from './image-editor.service';

class AngularFireStorageMock {
  ref = () => {};
}

describe('ImageEditorService', () => {
  let service: ImageEditorService;
  let afStorage: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageEditorService, { provide: AngularFireStorage, useValue: new AngularFireStorageMock() }]
    });

    service = TestBed.inject(ImageEditorService);
    afStorage = TestBed.inject(AngularFireStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomId', () => {
    it('should get id string', () => {
      const id = service.getRandomId();
      expect(id).toBeInstanceOf(String);
    });
  });

  describe('upload', () => {
    it('should get id from upload on success', async () => {
      const refSpy = spyOn(afStorage, 'ref').and.returnValue({
        put: () => new Promise(resolve => resolve({ metadata: { name: 'id' } }))
      });
      await expectAsync(service.upload({} as Blob)).toBeResolvedTo('id');
      expect(refSpy).toHaveBeenCalledTimes(1);
    });

    it('should fail on empty input', async () => {
      await expectAsync(service.upload(null)).toBeRejectedWithError();
    });
  });
});
