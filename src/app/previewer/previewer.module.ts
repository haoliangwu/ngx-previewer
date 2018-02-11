import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewContainerComponent } from './preview-container.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';
import { DefaultViewerComponent } from './default-viewer/default-viewer.component';
import { ReaderService } from './reader.service';
import { DEFAULT_VIEWER_COMPS } from './index';
import { ViewerService } from './viewer.service';
import { GlobalConfig } from './model/config';
import { BaseViewerComponent } from './base-viewer/base-viewer.component';
import { globalConfig } from './model/config';
import { NativeAudioViewerComponent } from './audio-viewer/native-audio-viewer.component';

import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImgViewerComponent,
    PreviewContainerComponent,
    DefaultViewerComponent,
    NativeAudioViewerComponent,
    SafeUrlPipe
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
