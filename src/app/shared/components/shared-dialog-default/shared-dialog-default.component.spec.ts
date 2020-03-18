import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDialogDefaultComponent } from './shared-dialog-default.component';

describe('SharedDialogDefaultComponent', () => {
  let component: SharedDialogDefaultComponent;
  let fixture: ComponentFixture<SharedDialogDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDialogDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDialogDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
