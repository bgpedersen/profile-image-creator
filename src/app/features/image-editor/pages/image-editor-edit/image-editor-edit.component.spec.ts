import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { ImageEditorService } from '../../services/image-editor.service';
import { ImageEditorEditComponent } from './image-editor-edit.component';

// Setting up service to mock
class ImageEditorServiceMock {
  imageHandler = {
    imageDataURL$: new BehaviorSubject(null),
  };
}

describe('ImageEditorEditComponent', () => {
  let component: ImageEditorEditComponent;
  let fixture: ComponentFixture<ImageEditorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditorEditComponent],
      // Mock ImageEditorService here
      providers: [
        { provide: ImageEditorService, useValue: new ImageEditorServiceMock() },
      ],
      // Using NO_ERRORS_SCHEMA to avoid having to include all custom elements
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditorEditComponent);
    component = fixture.componentInstance;
    // Moved detectChanges to blocks for more control
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Wrab block in fakeAsync, to run stream subscription synchronous
  it('should display app-file-input on imageDataURL not exists', () => {
    // TestBed.inject will inject the instantialized service from TestBed.configureTestingModule, meaning our mock service
    const imageEditorServiceMock = TestBed.inject(ImageEditorService);
    // init imageDataURL$ with null
    imageEditorServiceMock.imageHandler.imageDataURL$ = new BehaviorSubject(
      null
    );
    // define component data property
    let cdata;
    const hostEl: HTMLElement = fixture.nativeElement;

    // subscribe to stream, close after first data receieved
    component.imageDataURL$.pipe(first()).subscribe((data) => (cdata = data));
    // Update component view
    fixture.detectChanges();

    // Grab the elements by tag
    const appEditImg = hostEl.querySelector('app-edit-image'); // I don't exist
    const appFileInput = hostEl.querySelector('app-file-input');

    // Check that ngIf renders correct elements, and component data should be null
    expect(appFileInput).toBeTruthy();
    expect(appEditImg).toBeNull();
    expect(cdata).toBeNull();
  });
});
