import { Injectable, Type, Inject } from '@angular/core';
import { ViewerRules, ViewerConfig, ViewerRule, DEFAULT_CONFIG, ImgViewerConfig, AudioViewerConfig, VideoViewerConfig, ViewerInfo, PdfViewerConfig } from './model/viewer';
import { GlobalConfig, globalConfig } from './model/config';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DefaultViewerComponent, ImgViewerComponent, NativeAudioViewerComponent, NativeVideoViewerComponent, BaseViewerComponent, PdfViewerComponent } from './viewers/index';

@Injectable()
export class ViewerService {
  viewerInfo$: Subject<ViewerInfo<ViewerConfig>> = new Subject();

  // default ext rules
  private extRules: ViewerRules<BaseViewerComponent> = {
    other: {
      viewer: DefaultViewerComponent,
      config: {
        zoom: false,
        printable: false,
        draggable: false
      }
    },
    pdf: {
      viewer: PdfViewerComponent,
      config: {
        workerSrc: '//mozilla.github.io/pdf.js/build/pdf.worker.js'
      } as PdfViewerConfig
    }
  };

  // default mini-type rules
  private typeRules: ViewerRules<BaseViewerComponent> = {
    img: {
      viewer: ImgViewerComponent,
      config: {
        autoFit: true
      } as ImgViewerConfig
    },
    audio: {
      viewer: NativeAudioViewerComponent,
      config: {
        autoPlay: false
      } as AudioViewerConfig
    },
    video: {
      viewer: NativeVideoViewerComponent,
      config: {
        zoom: true,
        autoPlay: false
      } as VideoViewerConfig
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
    let rule = this.extRules[ext];

    // 如果是未注册的扩展名，则使用 mini-type 进行匹配
    if (!rule) {
      if (this.isImage(file)) {
        rule = this.typeRules.img;
      }

      if (this.isAudio(file)) {
        rule = this.typeRules.audio;
      }

      if (this.isVideo(file)) {
        rule = this.typeRules.video;
      }
    }

    // 如果都没有找到，则直接返回 default viewer
    return !!rule ? rule : this.extRules.other;
  }

  getViewerInfo(): Observable<ViewerInfo<ViewerConfig>> {
    return this.viewerInfo$.asObservable();
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

  private isAudio(file: File) {
    return file.type.match('audio.*');
  }

  private isVideo(file: File) {
    return file.type.match('video.*');
  }
}
