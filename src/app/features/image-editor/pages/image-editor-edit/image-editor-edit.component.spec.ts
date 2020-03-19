import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorService } from '../../services/image-editor.service';
import { ImageEditorEditComponent } from './image-editor-edit.component';

describe('ImageEditorEditComponent', () => {
  let imageEditorServiceStub: Partial<ImageEditorService>;

  let component: ImageEditorEditComponent;
  let fixture: ComponentFixture<ImageEditorEditComponent>;

  const spy = jasmine.createSpyObj('imageEditorServiceStub', ['imageHandler']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditorEditComponent],
      providers: [{ provide: ImageEditorService, useValue: imageEditorServiceStub }]
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
});
