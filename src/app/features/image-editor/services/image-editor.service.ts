import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ImageEditorService {
  public $dataURL = new BehaviorSubject<string>(null);
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  $uploadProgress: Observable<number>;
  $downloadURL: Observable<any>;
  $uploadState: Observable<string>;
  downloadUrls: string[] = ["empty"];
  downloadPath = "gs://profile-image-creator.appspot.com/images/thumbs";

  constructor(private afStorage: AngularFireStorage) {}

  // TODO set up rules authentication
  // https://firebase.google.com/docs/rules/basics?authuser=0

  // function to upload file
  upload = (blob: Blob) => {
    // create a random id
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref("/images/" + randomId);
    // the put method creates an AngularFireUploadTask and kicks off the upload
    this.task = this.ref.put(blob);

    // observe upload progress
    this.$uploadProgress = this.task.percentageChanges();
    this.$uploadProgress.subscribe(res =>
      console.log(console.log("$uploadProgress", res))
    );

    // get notified when the download URL is available
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          // this.$downloadURL = this.ref.getDownloadURL();
          console.log("DONE", this.task);
          this.downloadUrls = ["empty"];
          this.downloadUrls.push(
            `${this.downloadPath}/${randomId}_200x200.png`
          );
          this.downloadUrls.push(
            `${this.downloadPath}/${randomId}_400x400.png`
          );
          this.downloadUrls.push(
            `${this.downloadPath}/${randomId}_600x600.png`
          );
        })
      )
      .subscribe(res => console.log("task snapshotChanges", res));

    this.$uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  };

  resetDataUrl() {
    this.$dataURL.next(null);
  }
}
