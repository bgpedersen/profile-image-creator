import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { DownloadUrl } from '../../models/DownloadUrls.model';

@Component({
  selector: 'app-bottom-sheet-downloadurls',
  templateUrl: './bottom-sheet-downloadurls.component.html',
  styleUrls: ['./bottom-sheet-downloadurls.component.scss']
})
export class BottomSheetDownloadurlsComponent implements OnInit {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DownloadUrl[]) {}

  ngOnInit(): void {}
}
