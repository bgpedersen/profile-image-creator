import { Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"]
})
export class EditImageComponent implements OnInit {
  @Input() imgSrc: string;
  @ViewChild("canvasElm", { static: false }) canvasElm: ElementRef;
  @ViewChild("originalImg", { static: false }) originalImg: ElementRef;

  //   var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // ctx.beginPath();
  // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  // ctx.stroke();

  // Cropping WIP
  // https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    try {
      this.readSrc(changes.imgSrc.currentValue.test);
    } catch (error) {
      console.error(error);
    }
  }

  readSrc(src: string) {
    debugger;
    // Show original img
    this.originalImg.nativeElement.src = src;

    const inputImage = new Image();
    // we want to wait for our image to load
    inputImage.onload = () => {
      // create a canvas that will present the output image
      // const outputImage = document.createElement("canvas");

      // set it to the same size as the image
      this.canvasElm.nativeElement.width = inputImage.naturalWidth;
      this.canvasElm.nativeElement.height = inputImage.naturalHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = this.canvasElm.nativeElement.getContext("2d");
      ctx.drawImage(inputImage, 0, 0);
    };
    // start loading our image
    inputImage.src = src;
  }
}
