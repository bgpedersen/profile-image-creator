import { AngularFireStorage } from '@angular/fire/storage';

import { ImageEditorService } from './image-editor.service';

class AngularFireStorageMock {
  constructor() {}
}

fdescribe('ImageEditorService', () => {
  let service: ImageEditorService;
  const angularFireStorageMock = new AngularFireStorageMock();

  beforeEach(() => {
    service = new ImageEditorService(angularFireStorageMock as AngularFireStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create blob from canvas', (done: DoneFn) => {
    const canvas = document.createElement('canvas');
    service.canvasToBlob(canvas).then(blob => {
      expect(blob).toBeDefined();
      done();
    });
  });

  it('should get id from upload', (done: DoneFn) => {
    pending('because I dont know how to make type string in expect');
    const blob = new Blob();
    service.upload(blob).then(id => {
      // expect(id).toBe(true);
    });
  });
});
