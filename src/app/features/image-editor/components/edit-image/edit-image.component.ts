import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"]
})
export class EditImageComponent implements OnInit {
  @Input() dataURL: string;
  @ViewChild("origImg") origImg: ElementRef;
  @ViewChild("canvasEdit") canvasEdit: ElementRef;

  constructor(public imageEditorService: ImageEditorService) {}

  onReset() {
    this.imageEditorService.resetDataUrl();
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

  onDownload() {
    let canvasElm = this.canvasEdit.nativeElement;
    canvasElm.toBlob(e => {
      const blob = e;
      this.imageEditorService.upload(blob);
    }, "image/png");
  }

  public get $downloadUrls() {
    return this.imageEditorService.$downloadUrls;
  }

  public get $uploadProgress() {
    return this.imageEditorService.$uploadProgress;
  }

  public get $uploadState() {
    return this.imageEditorService.$uploadState;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.drawCanvas();
  }
}
