import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogDefaultData {
  title: string;
  content: string;
  cancel: string;
  ok: string;
}

@Component({
  selector: 'app-shared-dialog-default',
  templateUrl: './shared-dialog-default.component.html',
  styleUrls: ['./shared-dialog-default.component.scss'],
})
export class SharedDialogDefaultComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDefaultData) {}

  ngOnInit(): void {}
}
