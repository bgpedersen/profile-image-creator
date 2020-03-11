import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetDownloadurlsComponent } from './bottom-sheet-downloadurls.component';

describe('BottomSheetDownloadurlsComponent', () => {
  let component: BottomSheetDownloadurlsComponent;
  let fixture: ComponentFixture<BottomSheetDownloadurlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetDownloadurlsComponent ]
    })
    .compileComponents();
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
