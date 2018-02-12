import { Component, ElementRef, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ReaderService } from '../reader.service';
import { ViewerService } from '../viewer.service';
import { ViewerInfo, ViewerConfig } from '../model/viewer';

@Component({
  selector: 'ngx-base-viewer',
  template: ''
})
export abstract class BaseViewerComponent {
  constructor(
    @Inject(forwardRef(() => ViewerService)) protected viewService: ViewerService
  ) { }

  abstract loadFile(file: File): void;
  abstract render(data: string | ArrayBuffer): void;

  protected emitViewerInfo<C extends ViewerConfig>(info: ViewerInfo<C>) {
    this.viewService.viewerInfo$.next(info);
  }
}
