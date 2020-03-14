import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedHeaderComponent } from './components/shared-header/shared-header.component';

@NgModule({
  declarations: [SharedHeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  exports: [
    SharedHeaderComponent,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatSnackBarModule
  ]
})
export class SharedModule {}
