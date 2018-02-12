import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { Observable } from 'rxjs/Observable';
import { VideoViewerConfig } from '../model/viewer';
import { viewerConfig } from '../model/config';
import { ReaderService } from '../reader.service';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'ngx-native-video-viewer',
  templateUrl: './native-video-viewer.component.html',
  styleUrls: ['./native-video-viewer.component.scss']
})
export class NativeVideoViewerComponent extends BaseViewerComponent implements OnInit, OnDestroy {
  private videoURL: string;
  private canplay$: Observable<Event>;
  private $player: HTMLVideoElement;

  @ViewChild('player', { read: ElementRef }) protected player: ElementRef;

  constructor(
    protected readerService: ReaderService,
    @Inject(viewerConfig) protected config: VideoViewerConfig
  ) {
    super();
  }

  ngOnInit() {
    this.$player = this.player.nativeElement;

    this.canplay$ = fromEvent(this.$player, 'canplay');

    this.canplay$.subscribe(e => {
      this.render();
    });
  }

  ngOnDestroy() {
    this.readerService.revokeObjectURL(this.videoURL);
  }

  loadFile(file: File): void {
    this.videoURL = this.readerService.createObjectURL(file);
  }

  render(): void {
    if (this.config.autoPlay) {
      this.$player.play();
    }
  }
}
