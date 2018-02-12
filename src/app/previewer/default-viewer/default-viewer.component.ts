import { Component, OnInit } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { ViewerService } from '../viewer.service';

@Component({
  selector: 'ngx-default-viewer',
  templateUrl: './default-viewer.component.html',
  styleUrls: ['./default-viewer.component.scss']
})
export class DefaultViewerComponent extends BaseViewerComponent {
  constructor(
    protected viewerService: ViewerService,
  ) {
    super(viewerService);
  }

  loadFile(file: File): void {
  }

  render(data: string | ArrayBuffer): void {
  }
}
