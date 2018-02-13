import { Type } from '@angular/core';
import { BaseViewerComponent } from '../viewers/index';

export enum ViewerStatus {
  PENDING = 'pending',
  DONE = 'done'
}

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

export interface ViewerInfo<C extends ViewerConfig> {
  file: File;
  config: C;
  status: ViewerStatus;
}

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

export interface VideoViewerConfig extends ViewerConfig {
  autoPlay: boolean;
}
