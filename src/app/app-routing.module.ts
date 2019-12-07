import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "image-editor",
    loadChildren: () =>
      import("./features/image-editor/image-editor.module").then(
        m => m.ImageEditorModule
      )
  },
  { path: "", redirectTo: "image-editor", pathMatch: "full" },
  { path: "**", redirectTo: "image-editor" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
