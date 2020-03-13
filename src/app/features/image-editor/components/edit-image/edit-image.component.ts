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
  @Input() dataURL: string;
  @ViewChild('canvasEdit') canvasEdit: ElementRef;
  loading = false;
  downloadUrls: DownloadUrl[] = [];
  subs: Subscription[] = [];

  constructor(
    public imageEditorService: ImageEditorService,
    private matBottomSheet: MatBottomSheet,
    private matSnackBar: MatSnackBar
  ) {}

  // no need to use save and restore between calls as it sets the transform rather
  // than multiply it like ctx.rotate ctx.translate ctx.scale and ctx.transform
  // Also combining the scale and origin into the one call makes it quicker
  // x,y position of image center
  // scale scale of image
  // rotation in radians.
  // function drawImage(image, x, y, scale, rotation){
  //   ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
  //   ctx.rotate(rotation);
  //   ctx.drawImage(image, -image.width / 2, -image.height / 2);
  // }

  // drawImage(image, canvas.width / 2, canvas.height / 2, 1, - Math.PI / 2);

  onRotate(direction: 'left' | 'right') {
    const degrees = 90;
    const canvas = this.canvasEdit.nativeElement;

    const image = new Image();
    image.onload = () => {
      this.canvasEdit.nativeElement.width = image.naturalWidth;
      this.canvasEdit.nativeElement.height = image.naturalHeight;
      const ctx = this.canvasEdit.nativeElement.getContext('2d');

      // const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    };

    image.src = canvas.toDataURL();
    // image.src = this.dataURL;
  }

  onReset() {
    this.imageEditorService.resetDataUrl();
  }

  drawCanvas() {
    return new Promise(resolve => {
      const inputImage = new Image();
      inputImage.onload = () => {
        this.canvasEdit.nativeElement.width = inputImage.naturalWidth;
        this.canvasEdit.nativeElement.height = inputImage.naturalHeight;
        const ctx = this.canvasEdit.nativeElement.getContext('2d');

        ctx.drawImage(inputImage, 0, 0);
        resolve();
      };
      inputImage.src = this.dataURL;
    });
  }

  // https://stackoverflow.com/questions/4276048/html5-canvas-fill-circle-with-image
  onMakeCircle() {
    const ctx = this.canvasEdit.nativeElement.getContext('2d');

    const inputImage = new Image();
    inputImage.onload = () => {
      ctx.save();
      ctx.beginPath();
      this.canvasEdit.nativeElement.width = inputImage.naturalWidth;
      this.canvasEdit.nativeElement.height = inputImage.naturalHeight;
      const centerX = this.canvasEdit.nativeElement.width / 2;
      const centerY = this.canvasEdit.nativeElement.height / 2;
      // Radius should be smallest of width or height
      const radius = centerX < centerY ? centerX : centerY;

      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(inputImage, 0, 0);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
      ctx.clip();
      ctx.closePath();
      ctx.restore();
    };

    inputImage.src = this.dataURL;
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
    const blob = await this.imageEditorService.canvasToBlob(this.canvasEdit);
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
    await this.drawCanvas();
    this.onMakeCircle();
  }
}
