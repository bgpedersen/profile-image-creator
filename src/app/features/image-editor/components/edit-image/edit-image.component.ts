import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"]
})
export class EditImageComponent implements OnInit {
  @Input() dataURL: string;
  @ViewChild("origImg", { static: false }) origImg: ElementRef;
  @ViewChild("canvasEdit", { static: false }) canvasEdit: ElementRef;

  //   var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // ctx.beginPath();
  // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  // ctx.stroke();

  // Cropping WIP
  // https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/

  constructor() {}

  drawCanvas() {
    // Show original img
    this.origImg.nativeElement.src = this.dataURL;

    const inputImage = new Image();
    // we want to wait for our image to load
    inputImage.onload = () => {
      // create a canvas that will present the output image
      // const outputImage = document.createElement("canvas");

      // set it to the same size as the image
      this.canvasEdit.nativeElement.width = inputImage.naturalWidth;
      this.canvasEdit.nativeElement.height = inputImage.naturalHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = this.canvasEdit.nativeElement.getContext("2d");
      ctx.drawImage(inputImage, 0, 0);
    };
    // start loading our image
    inputImage.src = this.dataURL;
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.drawCanvas();
  }
}
