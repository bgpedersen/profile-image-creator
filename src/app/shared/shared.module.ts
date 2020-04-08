import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedDialogDefaultComponent } from './components/shared-dialog-default/shared-dialog-default.component';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';

@NgModule({
  declarations: [SharedHeaderComponent, SharedDialogDefaultComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    SharedHeaderComponent,
    SharedDialogDefaultComponent,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [SharedDialogDefaultComponent],
})
export class SharedModule {}
