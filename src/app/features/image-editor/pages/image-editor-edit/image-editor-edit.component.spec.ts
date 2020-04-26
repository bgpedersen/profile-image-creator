import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ImageEditorService } from '../../services/image-editor.service';
import { ImageEditorEditComponent } from './image-editor-edit.component';

describe('ImageEditorEditComponent', () => {
  let component: ImageEditorEditComponent;
  let fixture: ComponentFixture<ImageEditorEditComponent>;
  let imageEditorServiceMock: jasmine.SpyObj<ImageEditorService>;

  beforeEach(async(() => {
    imageEditorServiceMock = jasmine.createSpyObj<ImageEditorService>([
      'imageHandler',
    ]);

    TestBed.configureTestingModule({
      declarations: [ImageEditorEditComponent],
      providers: [
        { provide: ImageEditorService, useValue: imageEditorServiceMock },
      ],
      // Using NO_ERRORS_SCHEMA to avoid having to include all custom elements
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display app-file-input on imageDataURL not exists', () => {
    // define component data property
    let cdata;
    const hostEl: HTMLElement = fixture.nativeElement;
    const service = TestBed.inject(ImageEditorService);
    service.imageHandler.imageDataURL$ = new BehaviorSubject(null);

    component.imageDataURL$.subscribe((data) => (cdata = data));
    // Update component view
    fixture.detectChanges();
    const appFileInput = hostEl.querySelector('app-file-input');

    // Check that ngIf renders correct elements, and component data should be null
    expect(appFileInput).toBeTruthy();
    expect(cdata).toBeNull();
  });
});
