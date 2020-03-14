import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageEditorEditComponent } from './pages/image-editor-edit/image-editor-edit.component';

const routes: Routes = [
  { path: 'image-edit-editor', component: ImageEditorEditComponent },
  { path: '', redirectTo: 'image-edit-editor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageEditorRoutingModule {}
