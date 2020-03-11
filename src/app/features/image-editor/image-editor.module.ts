import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  BottomSheetDownloadurlsComponent
} from './components/bottom-sheet-downloadurls/bottom-sheet-downloadurls.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { ImageEditorRoutingModule } from './image-editor-routing.module';
import { ImageEditorEditComponent } from './pages/image-editor-edit/image-editor-edit.component';

@NgModule({
  declarations: [
    UploadImageComponent,
    EditImageComponent,
    ImageEditorEditComponent,
    BottomSheetDownloadurlsComponent
  ],
  imports: [SharedModule, ImageEditorRoutingModule],
  entryComponents: [BottomSheetDownloadurlsComponent]
})
export class ImageEditorModule {}
