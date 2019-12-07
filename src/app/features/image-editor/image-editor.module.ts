import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { EditImageComponent } from './components/edit-image/edit-image.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ImageEditorRoutingModule } from './image-editor-routing.module';
import { ImageEditorEditComponent } from './pages/image-editor-edit/image-editor-edit.component';

@NgModule({
  declarations: [
    UploadImageComponent,
    EditImageComponent,
    ImageEditorEditComponent
  ],
  imports: [CommonModule, SharedModule, ImageEditorRoutingModule]
})
export class ImageEditorModule {}
