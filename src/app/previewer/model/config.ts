import { ViewerRules, ViewerRule, ImgViewerConfig, ViewerConfig } from './viewer';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';

import { InjectionToken } from '@angular/core';
import { GlobalConfig } from './config';

import { DefaultViewerComponent } from '../default-viewer/default-viewer.component';
import { ImgViewerComponent } from '../img-viewer/img-viewer.component';
import { NativeAudioViewerComponent } from '../audio-viewer/native-audio-viewer.component';
import { NativeVideoViewerComponent } from '../video-viewer/native-video-viewer.component';


export const globalConfig: InjectionToken<GlobalConfig<BaseViewerComponent>> = new InjectionToken('preview.global.config');


export interface GlobalConfig<T extends BaseViewerComponent> {
  viewerConfig?: {
    ext?: ViewerRules<T>,
    type?: ViewerRules<T>
  };
}

export const viewerConfig: InjectionToken<ViewerConfig> = new InjectionToken('preview.viewer.config');
