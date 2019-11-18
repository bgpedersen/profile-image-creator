import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorEditComponent } from './image-editor-edit.component';

describe("ImageEditorEditComponent", () => {
  let component: ImageEditorEditComponent;
  let fixture: ComponentFixture<ImageEditorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditorEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
