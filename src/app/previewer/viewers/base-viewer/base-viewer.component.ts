import { Component, ElementRef, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ReaderService } from '../../reader.service';
import { ViewerService } from '../../viewer.service';
import { ViewerInfo, ViewerConfig, ViewerStatus } from '../../model/viewer';

export abstract class BaseViewerComponent<C extends ViewerConfig = {}> {
  constructor(
    protected config: C,
    public readerService: ReaderService,
    @Inject(forwardRef(() => ViewerService)) public viewService: ViewerService
  ) { }

  abstract loadFile(file: File): any;
  abstract render(...args: any[]): any;

  private emitViewerInfo(info: ViewerInfo<C>) {
    this.viewService.viewerInfo$.next(info);
  }

  protected viewerInPending(config: C = this.config, file = this.readerService.currentFile) {
    this.emitViewerInfo({
      config,
      file: this.readerService.currentFile,
      status: ViewerStatus.PENDING
    });
  }

  protected viewerInDone(config: C = this.config, file = this.readerService.currentFile) {
    this.emitViewerInfo({
      config,
      file: this.readerService.currentFile,
      status: ViewerStatus.DONE
    });
  }
}
