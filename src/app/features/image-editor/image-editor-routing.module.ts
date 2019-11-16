import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: '', redirectTo: 'edit', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageEditorRoutingModule {}
