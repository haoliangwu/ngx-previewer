import { Component, Host, Inject, ElementRef, ViewChild, forwardRef, OnInit } from '@angular/core';
import { BaseViewerComponent } from '../base-viewer/base-viewer.component';
import { Subscription } from 'rxjs/Subscription';
import { tap, map } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { PreviewContainerComponent } from '../preview-container.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'ngx-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})
export class ImgViewerComponent extends BaseViewerComponent implements OnInit, OnDestroy {
  private read$$: Subscription;
  @ViewChild('viewer') private canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor(
    @Inject(forwardRef(() => PreviewContainerComponent))
    private containerComp: PreviewContainerComponent,
    protected readerService: ReaderService
  ) {
    super(readerService);

    this.render = this.render.bind(this);
  }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = this.containerComp.width;
    this.canvas.height = this.containerComp.height;

    this.read$$ = this.readerService.onLoad().subscribe(this.render);
  }

  ngOnDestroy() {
    this.read$$.unsubscribe();
  }

  loadFile(file: File) {
    this.readerService.readAsDataURL(file);
  }

  render(data: string) {
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

    ctx.restore();

    const img = new Image();

    img.src = data;

    // TODO 这里需要根据容器和图片的宽高比进行缩放
    img.onload = () => ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }
}
