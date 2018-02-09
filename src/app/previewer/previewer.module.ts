import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewContainerDirective } from './preview-container.directive';
import { BaseViewerComponent } from './base-viewer/base-viewer.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BaseViewerComponent,
    ImgViewerComponent,
    PreviewContainerDirective
  ],
  exports: [
    PreviewContainerDirective
  ],
  entryComponents: [
    BaseViewerComponent,
    ImgViewerComponent
  ]
})
export class PreviewModule {

}
