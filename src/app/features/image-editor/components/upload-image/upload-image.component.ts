import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  imageURL: string;
  @Output() src: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.imageURL = "/assets/images/nopic.jpg";
  }

  ngOnInit() {}

  onUpload() {
    this.src.emit(this.imageURL);
  }
}
