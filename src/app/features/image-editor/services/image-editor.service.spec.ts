import { TestBed } from '@angular/core/testing';

import { ImageEditorService } from './image-editor.service';

describe('ImageEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageEditorService = TestBed.get(ImageEditorService);
    expect(service).toBeTruthy();
  });
});
