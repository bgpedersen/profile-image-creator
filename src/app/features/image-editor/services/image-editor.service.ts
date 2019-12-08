import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ImageEditorService {
  public $dataURL = new BehaviorSubject<string>(null);

  constructor() {}
}
