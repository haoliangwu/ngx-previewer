import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { ReaderService } from '../reader.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { viewerConfig } from '../model/config';
import { AudioViewerConfig } from '../model/viewer';

@Component({
  selector: 'ngx-native-audio-viewer',
  templateUrl: './native-audio-viewer.component.html',
  styleUrls: ['./native-audio-viewer.component.scss']
})
export class NativeAudioViewerComponent extends BaseViewerComponent implements OnInit, OnDestroy {
  private audioURL: string;
  private canplay$: Observable<Event>;

  @ViewChild('player', { read: ElementRef }) protected player: ElementRef;

  constructor(
    protected readerService: ReaderService,
    @Inject(viewerConfig) protected config: AudioViewerConfig
  ) {
    super();
  }

  ngOnInit() {
    const $player: HTMLAudioElement = this.player.nativeElement;

    this.canplay$ = fromEvent($player, 'canplay');

    this.canplay$.subscribe(e => {
      if (this.config.autoPlay) {
        $player.play();
      }
    });
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.audioURL);
  }

  loadFile(file: File): void {
    this.audioURL = URL.createObjectURL(file);
  }

  render(data: string | ArrayBuffer): void { }
}
