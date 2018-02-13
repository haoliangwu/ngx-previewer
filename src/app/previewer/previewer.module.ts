import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewContainerComponent } from './preview-container.component';
import { ReaderService } from './reader.service';
import { ViewerService } from './viewer.service';
import { GlobalConfig } from './model/config';
import { globalConfig } from './model/config';

import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { DefaultViewerComponent, ImgViewerComponent, NativeAudioViewerComponent, NativeVideoViewerComponent, BaseViewerComponent } from './viewers/index';



export const DEFAULT_VIEWER_COMPS = [
  DefaultViewerComponent,
  ImgViewerComponent,
  NativeAudioViewerComponent,
  NativeVideoViewerComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImgViewerComponent,
    PreviewContainerComponent,
    DefaultViewerComponent,
    NativeAudioViewerComponent,
    SafeUrlPipe,
    NativeVideoViewerComponent
  ],
  exports: [
    PreviewContainerComponent
  ],
  entryComponents: [
    ImgViewerComponent,
    DefaultViewerComponent
  ]
})
export class NgxPreviewModule {
  static forRoot(config: GlobalConfig<BaseViewerComponent> = {}, viewerComps: any[] = DEFAULT_VIEWER_COMPS): ModuleWithProviders {
    return {
      ngModule: NgxPreviewModule,
      providers: [
        ReaderService,
        ViewerService,
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: viewerComps,
          multi: true
        },
        {
          provide: globalConfig,
          useValue: config
        }
      ]
    };
  }

  static withEntryComps(viewerComps: any[]): ModuleWithProviders {
    return {
      ngModule: NgxPreviewModule,
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: viewerComps,
          multi: true
        }
      ]
    };
  }
}
