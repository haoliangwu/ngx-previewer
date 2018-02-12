import { Component, Host, Inject, ElementRef, ViewChild, forwardRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { Subscription } from 'rxjs/Subscription';
import { tap, map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { PreviewContainerComponent } from '../preview-container.component';
import { ReaderService } from '../reader.service';
import { viewerConfig } from '../model/config';
import { ImgViewerConfig, ViewerStatus } from '../model/viewer';
import { geometricScaling, alignCenter } from '../utils/calc';
import { ViewerService } from '../viewer.service';

@Component({
  selector: 'ngx-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})
export class ImgViewerComponent extends BaseViewerComponent implements AfterViewInit, OnDestroy {
  private read$$: Subscription;
  @ViewChild('viewer') private viewerRef: ElementRef;
  private canvas: HTMLCanvasElement;
  private img: HTMLImageElement;
  private useImgTag = false;

  constructor(
    @Inject(forwardRef(() => PreviewContainerComponent))
    private containerComp: PreviewContainerComponent,
    private renderer2: Renderer2,
    protected readerService: ReaderService,
    protected viewerService: ViewerService,
    @Inject(viewerConfig) protected config: ImgViewerConfig
  ) {
    super(viewerService);

    this.render = this.render.bind(this);
  }

  ngAfterViewInit() {
    if (!this.useImgTag) {
      this.canvas = this.viewerRef.nativeElement;
      this.canvas.width = this.containerComp.width;
      this.canvas.height = this.containerComp.height;
    } else {
      this.img = this.viewerRef.nativeElement;
    }

    this.read$$ = this.readerService.onImageLoad().subscribe(this.render);
  }

  ngOnDestroy() {
    this.read$$.unsubscribe();
  }

  loadFile(file: File) {
    if (this.isGif(file)) {
      this.useImgTag = true;
    }

    this.emitViewerInfo<ImgViewerConfig>({
      config: this.config,
      file: file,
      status: ViewerStatus.PENDING
    });

    this.readerService.readAsImg(file);
  }

  render() {
    let sw, sh;
    if (this.config.autoFit) {
      // if autoFit = true, should adjust image size based on canvas
      [sw, sh] = geometricScaling(this.readerService.img.width, this.readerService.img.height, this.containerComp.width, this.containerComp.height);
    }

    if (!this.useImgTag) {
      const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

      ctx.restore();

      let x = 0, y = 0;

      [x, y] = alignCenter(sw, sh, this.canvas.width, this.canvas.height);

      ctx.drawImage(this.readerService.img, x, y, sw, sh);
    } else {
      this.renderer2.setStyle(this.img, 'width', `${sw}px`);
      this.renderer2.setStyle(this.img, 'height', `${sh}px`);
    }

    this.emitViewerInfo<ImgViewerConfig>({
      config: this.config,
      file: this.readerService.currentFile,
      status: ViewerStatus.DONE
    });
  }

  private isGif(file: File) {
    return file.type.match('image/gif');
  }
}
