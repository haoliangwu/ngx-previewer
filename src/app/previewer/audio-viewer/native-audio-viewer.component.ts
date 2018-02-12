import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject, forwardRef } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { ReaderService } from '../reader.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { viewerConfig } from '../model/config';
import { AudioViewerConfig } from '../model/viewer';
import { ViewerService } from '../viewer.service';

@Component({
  selector: 'ngx-native-audio-viewer',
  templateUrl: './native-audio-viewer.component.html',
  styleUrls: ['./native-audio-viewer.component.scss']
})
export class NativeAudioViewerComponent extends BaseViewerComponent implements OnInit, OnDestroy {
  private canplay$: Observable<Event>;
  private $player: HTMLAudioElement;

  @ViewChild('player', { read: ElementRef }) protected player: ElementRef;

  constructor(
    protected readerService: ReaderService,
    @Inject(forwardRef(() => ViewerService)) protected viewerService: ViewerService,
    @Inject(viewerConfig) protected config: AudioViewerConfig
  ) {
    super(viewerService);
  }

  ngOnInit() {
    this.$player = this.player.nativeElement;

    this.canplay$ = fromEvent(this.$player, 'canplay');

    this.canplay$.subscribe(e => {

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
