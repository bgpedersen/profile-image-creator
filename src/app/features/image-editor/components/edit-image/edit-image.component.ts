import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { DownloadUrl } from '../../models/DownloadUrls.model';
import { ImageEditorService } from '../../services/image-editor.service';
import {
  BottomSheetDownloadurlsComponent
} from '../bottom-sheet-downloadurls/bottom-sheet-downloadurls.component';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditImageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() imageDataURL: string;
  @ViewChild('canvasElm') canvasElm: ElementRef;
  loading = false;
  downloadUrls: DownloadUrl[] = [];
  subs: Subscription[] = [];

  constructor(
    public imageEditorService: ImageEditorService,
    private matBottomSheet: MatBottomSheet,
    private matSnackBar: MatSnackBar
  ) {}

  onRotate(degrees: number) {
    this.imageEditorService.canvasRotate(this.canvasElm.nativeElement, degrees);
  }

  onMakeCircle() {
    this.imageEditorService.canvasCircle(this.canvasElm.nativeElement);
  }

  onReset() {
    this.drawCanvas(this.imageDataURL, this.canvasElm.nativeElement);
  }

  onDelete() {
    this.imageEditorService.resetDataUrl();
  }

  drawCanvas(imageDataURL: string, canvas: HTMLCanvasElement) {
    this.imageEditorService.canvasDraw(imageDataURL, canvas);
  }

  openBottomSheet(downloadUrls: DownloadUrl[]) {
    const bottomSheetRef = this.matBottomSheet.open(
      BottomSheetDownloadurlsComponent,
      {
        data: downloadUrls
      }
    );

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }

  async onDownload() {
    // Already generated thumbnails, dont upload again
    if (this.downloadUrls.length) {
      this.openBottomSheet(this.downloadUrls);
      return;
    }
    this.loading = true;
    const blob = await this.imageEditorService.canvasToBlob(
      this.canvasElm.nativeElement
    );
    try {
      await this.imageEditorService.upload(blob);
    } catch (feedback) {
      console.error(feedback);

      // If error contains Id, make retry possible
      if (feedback.id) {
        // Simple message with an action.
        const snackBarRef = this.matSnackBar.open(
          'Download links not generated yet',
          'Retry'
        );

        snackBarRef.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
          this.imageEditorService.retrieveDownloadUrls(feedback.id);
        });
      }
    }

    this.loading = false;
  }

  ngOnInit() {
    this.subs.push(
      this.imageEditorService.imageHandler.downloadUrls$.subscribe(
        downloadUrls => {
          this.downloadUrls = downloadUrls;
          if (downloadUrls?.length) {
            this.openBottomSheet(downloadUrls);
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    this.drawCanvas(this.imageDataURL, this.canvasElm.nativeElement);
  }
}
