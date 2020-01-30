import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"]
})
export class EditImageComponent implements OnInit {
  @Input() dataURL: string;
  @ViewChild("origImg", { static: false }) origImg: ElementRef;
  @ViewChild("canvasEdit", { static: false }) canvasEdit: ElementRef;
  downloadDataUrl: string = null;

  constructor(private imageEditorService: ImageEditorService) {}

  onReset() {
    this.imageEditorService.$dataURL.next(null);
  }

  drawCanvas() {
    this.origImg.nativeElement.src = this.dataURL;

    const inputImage = new Image();
    inputImage.onload = () => {
      this.canvasEdit.nativeElement.width = inputImage.naturalWidth;
      this.canvasEdit.nativeElement.height = inputImage.naturalHeight;
      const ctx = this.canvasEdit.nativeElement.getContext("2d");

      ctx.drawImage(inputImage, 0, 0);
    };
    inputImage.src = this.dataURL;
  }

  // https://stackoverflow.com/questions/4276048/html5-canvas-fill-circle-with-image
  onMakeCircle() {
    const ctx = this.canvasEdit.nativeElement.getContext("2d");

    const inputImage = new Image();
    inputImage.onload = () => {
      ctx.save();
      ctx.beginPath();
      this.canvasEdit.nativeElement.width = inputImage.naturalWidth;
      this.canvasEdit.nativeElement.height = inputImage.naturalHeight;
      let centerX = this.canvasEdit.nativeElement.width / 2;
      let centerY = this.canvasEdit.nativeElement.height / 2;
      // Radius should be smallest of width or height
      let radius = centerX < centerY ? centerX : centerY;

      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(inputImage, 0, 0);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
      ctx.clip();
      ctx.closePath();
      ctx.restore();
    };

    inputImage.src = this.dataURL;
  }

  // Need to upload images to firebase
  // https://www.codewithchintan.com/how-to-upload-and-display-image-file-in-pwa-angular-project-using-firebase-cloud-storage-and-angularfire/amp/
  // https://console.firebase.google.com/u/0/project/profile-image-creator/storage/profile-image-creator.appspot.com/files
  // https://console.firebase.google.com/u/0/project/profile-image-creator/extensions/instances/storage-resize-images?tab=usage
  onDownload() {
    const dataURL = this.canvasEdit.nativeElement.toDataURL();
    // set canvasImg image src to dataURL
    // so it can be saved as an image
    this.downloadDataUrl = dataURL;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.drawCanvas();
  }
}
