import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorService } from '../../services/image-editor.service';
import { FileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;
  let imageEditorServiceMock: Partial<ImageEditorService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileInputComponent],
      providers: [
        { provide: ImageEditorService, useValue: imageEditorServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
