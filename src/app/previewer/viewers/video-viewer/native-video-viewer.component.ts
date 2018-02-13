import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject, forwardRef } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { Observable } from 'rxjs/Observable';
import { VideoViewerConfig } from '../../model/viewer';
import { viewerConfig } from '../../model/config';
import { ReaderService } from '../../reader.service';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ViewerService } from '../../viewer.service';

@Component({
  selector: 'ngx-native-video-viewer',
  templateUrl: './native-video-viewer.component.html',
  styleUrls: ['./native-video-viewer.component.scss']
})
export class NativeVideoViewerComponent extends BaseViewerComponent implements OnInit, OnDestroy {
  private canplay$: Observable<Event>;
  private $player: HTMLVideoElement;

  @ViewChild('player', { read: ElementRef }) protected player: ElementRef;

  constructor(
    public readerService: ReaderService,
    @Inject(forwardRef(() => ViewerService)) protected viewerService: ViewerService,
    @Inject(viewerConfig) protected config: VideoViewerConfig
  ) {
    super(readerService, viewerService);
  }

  ngOnInit() {
    this.$player = this.player.nativeElement;

    this.canplay$ = fromEvent(this.$player, 'canplay');

    this.canplay$.subscribe(e => {
      this.render();
    });
  }

  ngOnDestroy() {
    this.readerService.revokeObjectURL();
  }

  loadFile(file: File): void {
    this.readerService.createObjectURL(file);
  }

  render(): void {
    if (this.config.autoPlay) {
      this.$player.play();
    }
  }
}
