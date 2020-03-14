import { Component, OnInit } from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  constructor(private imageEditorService: ImageEditorService) {}

  ngOnInit() {}

  async onFileInput(fileEvent: Event) {
    try {
      const imageDataURL = await this.imageEditorService.getImageDataURLFromFileEvent(
        fileEvent
      );
      this.imageEditorService.imageHandler.imageDataURL$.next(imageDataURL);
    } catch (error) {
      console.error(error);
      this.imageEditorService.imageHandler.imageDataURL$.next(null);
    }
  }
}
