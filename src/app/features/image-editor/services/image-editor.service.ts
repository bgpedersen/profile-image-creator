import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';

import { DownloadUrl } from '../models/DownloadUrls.model';

class ImageHandler {
  imgDataUrl$ = new BehaviorSubject<string>(null);
  uploadProgress$: Observable<number>;
  uploadState$: Observable<string>;
  downloadUrls$ = new Subject<DownloadUrl[]>();
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
    return new Promise<DownloadUrl[]>((resolve, reject) => {
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

          forkJoin([img200$, img400$, img600$]).subscribe(
            res => {
              console.log(res);
              const [img200, img400, img600] = res;

              const downloadUrls = [
                { title: '200x200', url: img200 },
                { title: '400x400', url: img400 },
                { title: '600x600', url: img600 }
              ];

              this.imageHandler.downloadUrls$.next(downloadUrls);

              resolve(downloadUrls);
            },
            err => {
              throw err;
            }
          );
        }, 5000);
      });
    });
  }

  canvasToBlob(canvas, type = 'type/png') {
    return new Promise<Blob>((resolve, reject) => {
      const nativeElm = canvas.nativeElement;
      return nativeElm.toBlob(blob => {
        return resolve(blob);
      }, type);
    });
  }

  resetDataUrl() {
    this.imageHandler.imgDataUrl$.next(null);
    this.imageHandler.downloadUrls$.next([]);
  }
}
