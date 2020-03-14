import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';

import { DownloadUrl } from '../models/DownloadUrls.model';

class ImageHandler {
  imageDataURL$ = new BehaviorSubject<string>(null);
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

  retrieveDownloadUrls(id): Promise<DownloadUrl[]> {
    return new Promise((resolve, reject) => {
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
          reject(err);
        }
      );
    });
  }

  upload(blob: Blob): Promise<DownloadUrl[]> {
    return new Promise((resolve, reject) => {
      const randomId = Math.random()
        .toString(36)
        .substring(2);

      this.ref = this.afStorage.ref(`/images/${randomId}.png`);
      this.imageHandler.task = this.ref.put(blob);

      this.imageHandler.task.then(async result => {
        const id = result.metadata.name.split('.')[0];

        setTimeout(async () => {
          try {
            resolve(await this.retrieveDownloadUrls(id));
          } catch (error) {
            reject({ error, id });
          }
        }, 3000);
      });
    });
  }

  canvasToBlob(canvas: HTMLCanvasElement, type = 'type/png') {
    return new Promise<Blob>((resolve, reject) => {
      return canvas.toBlob(blob => {
        return resolve(blob);
      }, type);
    });
  }

  resetDataUrl() {
    this.imageHandler.imageDataURL$.next(null);
    this.imageHandler.downloadUrls$.next([]);
  }

  getImageDataURLFromFileEvent(fileinputElm: Event): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const file = (fileinputElm.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e: any) => {
          const src = e.target.result.toString();
          resolve(src);
        };
      } catch (e) {
        console.error('Error reading fileinput: ', e);
        reject(null);
      }
    });
  }

  // https://stackoverflow.com/questions/4276048/html5-canvas-fill-circle-with-image
  canvasCircle(canvas: HTMLCanvasElement) {
    return new Promise((resolve, reject) => {
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.onload = () => {
        ctx.save();
        ctx.beginPath();
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = centerX < centerY ? centerX : centerY;

        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(image, 0, 0);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
        ctx.clip();
        ctx.closePath();
        ctx.restore();

        resolve();
      };

      image.src = canvas.toDataURL();
    });
  }

  canvasRotate(canvas: HTMLCanvasElement, degrees = 90) {
    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d');

      // const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
      ctx.rotate((degrees * Math.PI) / 180);
      ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    };

    image.src = canvas.toDataURL();
  }

  canvasDraw(imageDataURL: string, canvas: HTMLCanvasElement) {
    return new Promise(resolve => {
      const inputImage = new Image();
      inputImage.onload = () => {
        canvas.width = inputImage.width;
        canvas.height = inputImage.height;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(inputImage, 0, 0);
        resolve();
      };
      inputImage.src = imageDataURL;
    });
  }
}
