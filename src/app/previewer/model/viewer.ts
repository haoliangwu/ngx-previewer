import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { Type } from '@angular/core';

export interface ViewerConfig {
  zoom?: boolean;
  printable?: boolean;
  draggable?: boolean;
}

export const DEFAULT_CONFIG: ViewerConfig = {
  zoom: true,
  printable: false,
  draggable: false
};

export interface ViewerRule<T extends BaseViewerComponent> {
  viewer: Type<T>;
  config?: ViewerConfig;
}

export interface ViewerRules<T extends BaseViewerComponent> {
  [extOrType: string]: ViewerRule<T>;
}

export interface ImgViewerConfig extends ViewerConfig {
  autoFit: boolean;
}

export interface AudioViewerConfig extends ViewerConfig {
  autoPlay: boolean;
}
