import { Component, OnInit } from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  imgUrl: string;

  constructor(private imageEditorService: ImageEditorService) {
    this.imgUrl = "/assets/images/nopic.jpg";
  }

  ngOnInit() {}

  onUpload(imgUrl: string) {
    this.imageEditorService.$imgUrl.next(imgUrl);
  }
}
