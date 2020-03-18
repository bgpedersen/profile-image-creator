import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { BottomSheetDownloadurlsComponent } from './bottom-sheet-downloadurls.component';

describe('BottomSheetDownloadurlsComponent', () => {
  let component: BottomSheetDownloadurlsComponent;
  let fixture: ComponentFixture<BottomSheetDownloadurlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BottomSheetDownloadurlsComponent],
      providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetDownloadurlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
