import { Injectable } from '@angular/core';
import { AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ImageEditorService {
  public $dataURL = new BehaviorSubject<string>(null);
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  $uploadProgress: Observable<number>;
  downloadURL: string;
  uploadState: Observable<string>;

  constructor(private afStorage: AngularFireStorageModule) {}

  // function to upload file
  upload = event => {
    // create a random id
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref("/images/" + randomId);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);

    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    this.$uploadProgress = this.task
      .snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

    // observe upload progress
    this.$uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
      .subscribe();

    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  };
}
