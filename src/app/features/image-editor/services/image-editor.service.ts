import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

class ImageHandler {
  imgDataUrl$ = new BehaviorSubject<string>(null);
  uploadProgress$: Observable<number>;
  uploadState$: Observable<string>;
  downloadUrls$ = new Subject<any>();
  task: AngularFireUploadTask;
  refDownloadURL$: Observable<any>;
  constructor() {}
}

@Injectable({
  providedIn: 'root'
})
export class ImageEditorService {
  public imageHandler = new ImageHandler();
  ref: AngularFireStorageReference;

  constructor(private afStorage: AngularFireStorage) {}

  upload(blob: Blob) {
    return new Promise<any>((resolve, reject) => {
      const randomId = Math.random()
        .toString(36)
        .substring(2);

      this.ref = this.afStorage.ref(`/images/${randomId}.png`);
      this.imageHandler.task = this.ref.put(blob);

      return this.imageHandler.task.then(async result => {
        const id = result.metadata.name.split('.')[0];

        setTimeout(() => {
          const img200$ = this.afStorage
            .ref(`/images/thumbs/${id}_200x200.png`)
            .getDownloadURL();
          const img400$ = this.afStorage
            .ref(`/images/thumbs/${id}_400x400.png`)
            .getDownloadURL();
          const img600$ = this.afStorage
            .ref(`/images/thumbs/${id}_600x600.png`)
            .getDownloadURL();

          resolve([
            { title: '200x200', url: img200$ },
            { title: '400x400', url: img400$ },
            { title: '600x600', url: img600$ }
          ]);
        }, 5000);
      });
    });
  }

  resetDataUrl() {
    this.imageHandler.imgDataUrl$.next(null);
    this.imageHandler.downloadUrls$.next([]);
  }
}
