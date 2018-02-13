import { Component, ElementRef, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ReaderService } from '../../reader.service';
import { ViewerService } from '../../viewer.service';
import { ViewerInfo, ViewerConfig } from '../../model/viewer';

export abstract class BaseViewerComponent {
  constructor(
    public readerService: ReaderService,
    @Inject(forwardRef(() => ViewerService)) public viewService: ViewerService
  ) { }

  abstract loadFile(file: File): any;
  abstract render(...args: any[]): any;

  protected emitViewerInfo<C extends ViewerConfig>(info: ViewerInfo<C>) {
    this.viewService.viewerInfo$.next(info);
  }
}
