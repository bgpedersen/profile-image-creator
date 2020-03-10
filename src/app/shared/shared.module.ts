import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedFooterComponent } from './components/shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';

@NgModule({
  declarations: [SharedHeaderComponent, SharedFooterComponent],
  imports: [CommonModule],
  exports: [SharedHeaderComponent, SharedFooterComponent]
})
export class SharedModule {}
