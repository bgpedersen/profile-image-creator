import { async, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, of } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { ImageEditorService } from './image-editor.service';

class AngularFireStorageMock {
  ref(path: string) {
    return {
      put: () => new Promise((res) => res({ metadata: { name: 'id' } })),
      getDownloadURL: () => of(path),
    };
  }
}

describe('ImageEditorService', () => {
  let service: ImageEditorService;
  let afStorage: Partial<AngularFireStorage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ImageEditorService, { provide: AngularFireStorage, useValue: new AngularFireStorageMock() }],
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
        { title: '600x600', url: '/images/thumbs/url_600x600.png' },
      ];

      const res = await service.retrieveDownloadUrls('url');
      expect(res).toEqual(downloadUrls);
    });
  });

  describe('observable testing', () => {
    const values = [1, 2, 3];

    const value$ = of(values);
    const values$ = from(values);

    it('should work with done syntax', (done: DoneFn) => {
      value$.subscribe((value) => {
        expect(value).toBe(values);
        done();
      });

      let index = 0;
      values$.subscribe((val) => {
        expect(val).toEqual(values[index]);
        index++;
        done();
      });
    });

    let testScheduler: TestScheduler;
    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {});
    });

    fit('should test observables over time with marble', () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable, expectSubscriptions } = helpers;
        const values$ = cold('1-2-3|');
        const subs = '^----';
        const expected = '1-2-3|';

        expectObservable(values$.pipe(throttleTime(3, testScheduler))).toBe(expected);
        expectSubscriptions(values$.subscriptions).toBe(subs);
      });
    });
  });
});
