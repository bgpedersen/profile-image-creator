import { AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';

export class ImageHandler {
  public imageDataURL$ = new BehaviorSubject<string>(null);
  public uploadProgress$: Observable<number>;
  public uploadState$: Observable<string>;
  public task: AngularFireUploadTask;
  public refDownloadURL$: Observable<any>;
}
