import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ImageEditorService } from '../../services/image-editor.service';
import { ImageEditorEditComponent } from './image-editor-edit.component';

class ImageEditorServiceMock {
  imageHandler = {
    imageDataURL$: new BehaviorSubject(null)
  };
}

fdescribe('ImageEditorEditComponent', () => {
  let component: ImageEditorEditComponent;
  let fixture: ComponentFixture<ImageEditorEditComponent>;

  const imageEditorServiceMock = new ImageEditorServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditorEditComponent],
      providers: [{ provide: ImageEditorService, useValue: imageEditorServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display app-file-input on imageDataURL not exists', () => {});

  it('should render app-edit-image component on imageDataURL exists', () => {
    component.imageEditorService.imageHandler.imageDataURL$.next('some img data');
    pending();
  });
});
