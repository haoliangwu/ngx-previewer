import { DefaultViewerComponent } from './default-viewer/default-viewer.component';
import { ImgViewerComponent } from './img-viewer/img-viewer.component';
import { NativeAudioViewerComponent } from './audio-viewer/native-audio-viewer.component';
import { NativeVideoViewerComponent } from './video-viewer/native-video-viewer.component';

export const DEFAULT_VIEWER_COMPS = [
  DefaultViewerComponent,
  ImgViewerComponent,
  NativeAudioViewerComponent,
  NativeVideoViewerComponent
];

export * from './previewer.module';

export { BaseViewerComponent } from './base-viewer/base-viewer.component';

export { DefaultViewerComponent } from './default-viewer/default-viewer.component';

export { ImgViewerComponent } from './img-viewer/img-viewer.component';

export { NativeAudioViewerComponent } from './audio-viewer/native-audio-viewer.component';
export { NativeVideoViewerComponent } from './video-viewer/native-video-viewer.component';

export { ViewerService } from './viewer.service';

export { ReaderService } from './reader.service';
