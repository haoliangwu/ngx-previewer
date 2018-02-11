import { Component, OnInit } from '@angular/core';
import { ViewerService, DefaultViewerComponent, ReaderService } from './previewer/index';
import { LoadingMaskService } from 'ngx-loading-mask';
import { ElementRef } from '@angular/core/src/linker/element_ref';

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
    this.readerService.onLoadStart().subscribe((e) => {
      console.log(e);
      this.loadingMaskService.showGroup('preview');
    });
    this.readerService.onLoadEnd().subscribe((e) => {
      console.log(e);
      this.loadingMaskService.hideGroup('preview');
    });
  }
}
