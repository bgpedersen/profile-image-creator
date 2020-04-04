import { async, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';

import { ImageEditorService } from './image-editor.service';

class AngularFireStorageMock {
  ref(path: string) {
    return {
      put: () => new Promise(res => res({ metadata: { name: 'id' } })),
      getDownloadURL: () => of(path)
    };
  }
}

describe('ImageEditorService', () => {
  let service: ImageEditorService;
  let afStorage: Partial<AngularFireStorage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ImageEditorService, { provide: AngularFireStorage, useValue: new AngularFireStorageMock() }]
    });

    service = TestBed.inject(ImageEditorService);
    afStorage = TestBed.inject(AngularFireStorage);
  }));

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
      await expectAsync(service.upload({} as Blob)).toBeResolvedTo('id');
    });

    it('should fail on empty input', async () => {
      await expectAsync(service.upload(null)).toBeRejectedWithError();
    });
  });

  describe('retrieveDownloadUrls', () => {
    it('should return array', async () => {
      const downloadUrls = [
        { title: '200x200', url: '/images/thumbs/url_200x200.png' },
        { title: '400x400', url: '/images/thumbs/url_400x400.png' },
        { title: '600x600', url: '/images/thumbs/url_600x600.png' }
      ];

      const res = await service.retrieveDownloadUrls('url');
      expect(res).toEqual(downloadUrls);
    });
  });

  fdescribe('observable testing', () => {
    const singleObs = new Observable(sub => {
      sub.next('1');
      sub.next('2');
      sub.complete();
    });

    const multipleObs = new Observable(sub => {
      sub.next('1');
      setTimeout(() => {
        sub.next('2');
      }, 2000);

      setTimeout(() => {
        sub.complete();
      }, 3000);
    });

    it('should be able to test observable', () => {
      const sub = singleObs.subscribe(res => {
        console.log(res);
      });

      sub.unsubscribe();
    });
    xit('should recieve single observable', () => {});
    xit('should recieve multiple observable', () => {});
  });
});
