import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'ngx-base-viewer',
  template: ''
})
export abstract class BaseViewerComponent {
  abstract loadFile(file: File): void;
  abstract render(data: string | ArrayBuffer): void;
}
