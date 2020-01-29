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
      var centerX = this.canvasEdit.nativeElement.width / 2;
      var centerY = this.canvasEdit.nativeElement.height / 2;
      var radius = centerX;
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

  download() {
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
