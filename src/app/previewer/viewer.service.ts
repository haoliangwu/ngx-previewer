import { Injectable, Type, Inject } from '@angular/core';
import { ImgViewerComponent, DefaultViewerComponent } from './index';
import { BaseViewerComponent } from './base-viewer/base-viewer.component';
import { ViewerRules, ViewerConfig, ViewerRule, DEFAULT_CONFIG, ImgViewerConfig } from './model/viewer';
import { GlobalConfig, globalConfig } from './model/config';

@Injectable()
export class ViewerService {
  private extRules: ViewerRules<BaseViewerComponent> = {
    other: {
      viewer: DefaultViewerComponent,
      config: {
        zoom: false,
        printable: false,
        draggable: false
      }
    }
  };
  private typeRules: ViewerRules<BaseViewerComponent> = {
    img: {
      viewer: ImgViewerComponent,
      config: {
        zoom: false,
        printable: false,
        draggable: false,
        autoFit: true
      } as ImgViewerConfig
    }
  };

  constructor(
    @Inject(globalConfig) config: GlobalConfig<BaseViewerComponent>
  ) {
    const { viewerConfig } = config;

    if (!!viewerConfig) {
      this.extRules = { ...this.extRules, ...viewerConfig.ext };
      this.typeRules = { ...this.typeRules, ...viewerConfig.type };
    }
  }

  getViewerRule(file: File) {
    const ext = this.getFileExt(file);

    // 首先通过扩展名取 viewer
    const rule = this.extRules[ext];

    // 如果是未注册的扩展名，则使用 mini-type 进行匹配
    if (!rule) {
      if (this.isImage(file)) {
        return this.typeRules.img;
      }
    }

    // 如果都没有找到，则直接返回 default viewer
    return this.extRules.other;
  }

  registerExtRule<T extends BaseViewerComponent>(ext: string, viewer: Type<T>, config: ViewerConfig = DEFAULT_CONFIG) {
    this.registerRule<T>(ext, viewer, config, true);
  }

  registerTypeRule<T extends BaseViewerComponent>(type: string, viewer: Type<T>, config: ViewerConfig = DEFAULT_CONFIG) {
    this.registerRule<T>(type, viewer, config, false);
  }

  private registerRule<T extends BaseViewerComponent>(extOrType: string, viewer: Type<T>, config: ViewerConfig, isExt = true) {
    if (isExt) {
      this.extRules[extOrType] = { viewer, config };
    } else {
      this.typeRules[extOrType] = { viewer, config };
    }
  }

  private getFileExt(file: File) {
    return file.name.split('.').pop();
  }

  private isImage(file: File) {
    return file.type.match('image.*');
  }
}
