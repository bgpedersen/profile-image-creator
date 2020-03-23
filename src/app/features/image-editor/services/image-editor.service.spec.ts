import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { ImageEditorService } from './image-editor.service';

class AngularFireStorageMock {
  ref = () => {};
}

describe('ImageEditorService', () => {
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
    it('should get id string', () => {
      const id = service.getRandomId();
      expect(id).toBeInstanceOf(String);
    });
  });

  describe('upload', () => {
    it('should get id from upload on success', async () => {
      spyOn(afStorage, 'ref').and.callFake(() => {
        return { put: jasmine.createSpy('put').and.resolveTo({ metadata: { name: 'id' } }) };
      });
      const id = await service.upload({} as Blob);
      expect(id).toBeInstanceOf(String);
      expect(afStorage.ref).toHaveBeenCalled();
    });

    it('should fail on empty input', async () => {
      await expectAsync(service.upload(null)).toBeRejectedWithError();
    });
  });
});
