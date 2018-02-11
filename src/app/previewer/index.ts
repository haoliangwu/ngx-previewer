import { DefaultViewerComponent } from './default-viewer/default-viewer.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';
import { NativeAudioViewerComponent } from './audio-viewer/native-audio-viewer.component';

export const DEFAULT_VIEWER_COMPS = [
  DefaultViewerComponent,
  ImgViewerComponent,
  NativeAudioViewerComponent
];

export * from './previewer.module';

export { BaseViewerComponent } from './base-viewer/base-viewer.component';

export { DefaultViewerComponent } from './default-viewer/default-viewer.component';

export { ImgViewerComponent } from './img-viewer/img-viewer.component';

export { ViewerService } from './viewer.service';

export { ReaderService } from './reader.service';
