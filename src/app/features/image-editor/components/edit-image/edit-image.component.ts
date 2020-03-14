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
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

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
  @ViewChild('slider') sliderElm: ElementRef;
  loading = false;
  downloadUrls: DownloadUrl[] = [];
  subs: Subscription[] = [];
  imageElm: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    public imageEditorService: ImageEditorService,
    private matBottomSheet: MatBottomSheet,
    private matSnackBar: MatSnackBar
  ) {}

  onRotate(degrees: number) {
    this.imageEditorService.canvasRotate(
      this.imageElm,
      this.ctx,
      // this.canvasElm.nativeElement,
      degrees
    );
  }

  onMakeCircle() {
    this.imageEditorService.canvasCircle(this.imageElm, this.ctx);
  }

  onReset() {
    this.imageEditorService.canvasDraw(
      this.imageElm,
      this.canvasElm.nativeElement
    );
  }

  onDelete() {
    this.imageEditorService.resetDataUrl();
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

  async ngAfterViewInit() {
    this.imageElm = await this.imageEditorService.createImageFromImageDataUrl(
      this.imageDataURL
    );
    this.ctx = this.imageEditorService.canvasDraw(
      this.imageElm,
      this.canvasElm.nativeElement
    );

    this.subs.push(
      fromEvent(this.sliderElm.nativeElement, 'input')
        .pipe(
          debounceTime(150),
          tap(text => {
            console.log(text);
            console.log(this.sliderElm.nativeElement.value);
          })
        )
        .subscribe()
    );
  }
}
