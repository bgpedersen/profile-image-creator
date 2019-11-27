import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: "app-image-editor-edit",
  templateUrl: "./image-editor-edit.component.html",
  styleUrls: ["./image-editor-edit.component.scss"]
})
export class ImageEditorEditComponent implements OnInit, AfterViewInit {
  name = "Angular 8 by Example: ElementRef";
  @ViewChild("imageElm", { static: false }) imageElm: ElementRef;

  //   var c = document.getElementById("myCanvas");
  // var ctx = c.getContext("2d");
  // ctx.beginPath();
  // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  // ctx.stroke();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let imgDiv = this.imageElm.nativeElement.src;
    debugger;
  }
}
