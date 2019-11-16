import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageEditorRoutingModule } from './image-editor-routing.module';
import { EditComponent } from './pages/edit/edit.component';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ImageEditorRoutingModule
  ]
})
export class ImageEditorModule { }
