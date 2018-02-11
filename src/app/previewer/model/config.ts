import { ViewerRules, ViewerRule, ImgViewerConfig, ViewerConfig } from './viewer';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';

import { InjectionToken } from '@angular/core';
import { GlobalConfig } from './config';

export const globalConfig: InjectionToken<GlobalConfig<BaseViewerComponent>> = new InjectionToken('preview.global.config');


export interface GlobalConfig<T extends BaseViewerComponent> {
  viewerConfig?: {
    ext?: ViewerRules<T>,
    type?: ViewerRules<T>
  };
}

export const viewerConfig: InjectionToken<ViewerConfig> = new InjectionToken('preview.viewer.config');
