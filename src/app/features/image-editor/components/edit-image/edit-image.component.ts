import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import {
  SharedDialogDefaultComponent
} from 'src/app/shared/components/shared-dialog-default/shared-dialog-default.component';

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
export class EditImageComponent implements AfterViewInit {
  @Input() imageDataURL: string;
  @ViewChild('canvasElm') canvasElm: ElementRef;
  @ViewChild('slider') sliderElm: ElementRef;
  loading = false;
  subs: Subscription[] = [];
  imageElm: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    public imageEditorService: ImageEditorService,
    private matBottomSheet: MatBottomSheet,
    public matDialog: MatDialog
  ) {}

  onRotate(degrees: number) {
    this.imageEditorService.canvasRotate(this.imageElm, this.ctx, degrees);
  }

  onMakeCircle() {
    this.imageEditorService.canvasCircle(this.imageElm, this.ctx);
  }

  async onReset() {
    this.imageElm = await this.imageEditorService.createImageFromImageDataUrl(this.imageDataURL);
    this.imageEditorService.canvasDraw(this.imageElm, this.canvasElm.nativeElement);
  }

  onDelete() {
    const dialogRef = this.matDialog.open(SharedDialogDefaultComponent, {
      width: '250px',
      data: { title: 'Delete', content: 'Are you sure?', cancel: 'cancel', ok: 'yes' }
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(result => (result ? this.imageEditorService.resetDataUrl() : null));
  }

  openBottomSheet(downloadUrls: DownloadUrl[]) {
    const bottomSheetRef = this.matBottomSheet.open(BottomSheetDownloadurlsComponent, {
      data: downloadUrls
    });

    bottomSheetRef
      .afterDismissed()
      .pipe(take(1))
      .subscribe(() => {
        console.log('Bottom sheet has been dismissed.');
      });
  }

  async onDownload() {
    this.loading = true;
    const blob = await this.imageEditorService.canvasToBlob(this.canvasElm.nativeElement);

    // try {
    const id = await this.imageEditorService.upload(blob);
    const downloadUrls = await this.imageEditorService.retryRetrieveDownloadUrls(id);
    this.openBottomSheet(downloadUrls);
    // } catch (error) {
    //   this.matDialog.open(SharedDialogDefaultComponent, {
    //     width: '250px',
    //     data: { title: 'Error', content: JSON.stringify(error), cancel: null, ok: 'ok' }
    //   });
    // }

    this.loading = false;
  }

  async ngAfterViewInit() {
    this.imageElm = await this.imageEditorService.createImageFromImageDataUrl(this.imageDataURL);
    this.ctx = this.imageEditorService.canvasDraw(this.imageElm, this.canvasElm.nativeElement);
  }
}
