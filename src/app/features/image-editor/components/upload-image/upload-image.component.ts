import { Component, OnInit } from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  constructor(private imageEditorService: ImageEditorService) {}

  ngOnInit() {}

  onUpload(fileinputElm: Event) {
    try {
      const file = (fileinputElm.target as HTMLInputElement).files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e: any) => {
        const src = e.target.result.toString();
        this.imageEditorService.dataURL.next(src);
      };
    } catch (e) {
      console.error("Error reading fileinput: ", e);
      this.imageEditorService.dataURL.next(null);
    }
  }
}
