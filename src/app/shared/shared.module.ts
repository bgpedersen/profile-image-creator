import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedHeaderComponent } from './components/shared-header/shared-header.component';

@NgModule({
  declarations: [SharedHeaderComponent],
  imports: [CommonModule],
  exports: [SharedHeaderComponent]
})
export class SharedModule {}
