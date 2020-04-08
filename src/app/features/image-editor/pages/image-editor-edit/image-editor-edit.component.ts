import { Component, OnInit } from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: 'app-image-editor-edit',
  templateUrl: './image-editor-edit.component.html',
  styleUrls: ['./image-editor-edit.component.scss'],
})
export class ImageEditorEditComponent implements OnInit {
  constructor(public imageEditorService: ImageEditorService) {}

  ngOnInit() {}

  get imageDataURL$() {
    return this.imageEditorService.imageHandler.imageDataURL$;
  }
}
