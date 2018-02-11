import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { Type } from '@angular/core';

export interface ViewerControlConfig {
  zoom: boolean;
  printable: boolean;
  draggable: boolean;
}

export interface ViewerRule<T extends BaseViewerComponent> {
  viewer: Type<T>;
  config?: ViewerControlConfig;
}

export interface ViewerRules<T extends BaseViewerComponent> {
  [extOrType: string]: ViewerRule<T>;
}

export const DEFAULT_CONFIG: ViewerControlConfig = {
  zoom: true,
  printable: false,
  draggable: true
};
