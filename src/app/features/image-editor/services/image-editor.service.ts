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
  canvasCircle(imageElm: HTMLImageElement, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = centerX < centerY ? centerX : centerY;

    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(imageElm, 0, 0);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
    imageElm.src = ctx.canvas.toDataURL();
  }

  canvasRotate(
    imageElm: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    degrees = 90
  ) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(imageElm, -ctx.canvas.width / 2, -ctx.canvas.height / 2);
    ctx.restore();
    imageElm.src = ctx.canvas.toDataURL();
  }

  canvasScale(
    imageElm: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    scale = 1
  ) {
    console.log(scale);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.scale(scale, scale);
    ctx.drawImage(imageElm, 0, 0);
    ctx.restore();
    imageElm.src = ctx.canvas.toDataURL();
  }

  createImageFromImageDataUrl(imageDataURL: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.src = imageDataURL;
    });
  }

  canvasDraw(
    imageElm: HTMLImageElement,
    canvas: HTMLCanvasElement
  ): CanvasRenderingContext2D {
    canvas.width = imageElm.naturalWidth;
    canvas.height = imageElm.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageElm, 0, 0);

    return ctx;
  }
}
