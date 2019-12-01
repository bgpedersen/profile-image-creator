import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-image-editor-edit",
  templateUrl: "./image-editor-edit.component.html",
  styleUrls: ["./image-editor-edit.component.scss"]
})
export class ImageEditorEditComponent implements OnInit {
  imgSrc: string;

  constructor() {}

  getSrc(imgUrl: string) {
    this.imgSrc = imgUrl;
  }

  ngOnInit() {}
}
