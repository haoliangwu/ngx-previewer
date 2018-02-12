import { Component, OnInit } from '@angular/core';
import { ViewerService, DefaultViewerComponent, ReaderService } from './previewer/index';
import { LoadingMaskService } from 'ngx-loading-mask';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { ViewerStatus } from './previewer/model/viewer';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  file: File;

  constructor(
    private viewerService: ViewerService,
    private readerService: ReaderService,
    private loadingMaskService: LoadingMaskService
  ) { }

  handleClick(el: HTMLInputElement) {
    el.click();
  }

  selectFile(files: FileList) {
    this.file = files.item(0);
  }

  ngOnInit() {
    // this.viewerService.registerTypeRule('img', DefaultViewerComponent);
    this.viewerService.getViewerInfo()
      .subscribe(viewInfo => {
        const { status } = viewInfo;

        switch (status) {
          case ViewerStatus.PENDING:
            this.loadingMaskService.showGroup('preview');
            break;
          case ViewerStatus.DONE:
            this.loadingMaskService.hideGroup('preview');
            break;
        }
      }, err => {
        this.loadingMaskService.hideGroupError('preview', err);
      });
  }
}
