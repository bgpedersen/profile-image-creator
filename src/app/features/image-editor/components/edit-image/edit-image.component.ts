import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { ImageEditorService } from '../../services/image-editor.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EditImageComponent implements OnInit, AfterViewInit {
  @Input() dataURL: string;
  @ViewChild('origImg') origImg: ElementRef;
  @ViewChild('canvasEdit') canvasEdit: ElementRef;
  downloadUrls: any;

  constructor(public imageEditorService: ImageEditorService) {}

  onReset() {
    this.imageEditorService.resetDataUrl();
  }

  drawCanvas() {
    this.origImg.nativeElement.src = this.dataURL;

    const inputImage = new Image();
    inputImage.onload = () => {
      this.canvasEdit.nativeElement.width = inputImage.naturalWidth;
      this.canvasEdit.nativeElement.height = inputImage.naturalHeight;
      const ctx = this.canvasEdit.nativeElement.getContext('2d');

      ctx.drawImage(inputImage, 0, 0);
    };
    inputImage.src = this.dataURL;
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

  canvasToBlob(canvas, type = 'type/png') {
    return new Promise<Blob>((resolve, reject) => {
      const nativeElm = canvas.nativeElement;
      return nativeElm.toBlob(blob => {
        return resolve(blob);
      }, type);
    });
  }

  async onDownload() {
    const blob = await this.canvasToBlob(this.canvasEdit);
    this.downloadUrls = await this.imageEditorService.upload(blob);
    console.log(this.downloadUrls);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.drawCanvas();
  }
}
