import { Component, OnInit, forwardRef, Inject, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BaseViewerComponent } from '../';
import { ViewerService } from '../../viewer.service';
import { ReaderService } from '../../reader.service';
import { PDFJS, PDFPageProxy } from 'pdfjs-dist';
import { PdfViewerConfig, ViewerStatus } from '../../model/viewer';
import { viewerConfig } from '../../model/config';
import { PreviewContainerComponent } from '../../preview-container.component';
import { PdfService, RenderContext, RenderContextWithPage } from './pdf.service';
import { tap, map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ngx-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  providers: [PdfService]
})
export class PdfViewerComponent extends BaseViewerComponent<PdfViewerConfig> implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('viewer') private viewerRef: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor(
    // private containerComp: PreviewContainerComponent,
    public readerService: ReaderService,
    @Inject(forwardRef(() => ViewerService)) protected viewerService: ViewerService,
    @Inject(viewerConfig) protected config: PdfViewerConfig,
    public pdfService: PdfService
  ) {
    super(config, readerService, viewerService);
  }

  ngOnInit() {
    PDFJS.workerSrc = this.config.workerSrc;

    const url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';

    const load$ = this.pdfService.load(url);

    load$.pipe(
      map(page => this.prerender(page)),
      switchMap(({ page, context }) => this.render(page, context)),
      tap(() => {
        // TODO 应当抽离为独立的方法
        this.viewerInDone();
      })
    ).subscribe();

    this.loadPage(1);
  }

  ngAfterViewInit() {
    this.canvas = this.viewerRef.nativeElement;
    // this.canvas.width = this.containerComp.width;
    // this.canvas.height = this.containerComp.height;
  }

  ngOnDestroy() {
    this.readerService.revokeObjectURL();
  }

  loadFile(file: File): void {
    this.readerService.createObjectURL(file);
  }

  prerender(page: PDFPageProxy): RenderContextWithPage {
    console.log('Page loaded');

    const scale = 1.5;
    const viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions
    const context = this.canvas.getContext('2d');
    this.canvas.height = viewport.height;
    this.canvas.width = viewport.width;

    // Render PDF page into canvas context
    const renderContext: RenderContext = {
      canvasContext: context,
      viewport: viewport
    };

    return { page, context: renderContext };
  }

  render(page: PDFPageProxy, context: RenderContext): Observable<PDFPageProxy> {
    return this.pdfService.render(page, context);
  }

  loadPage(page: number) {
    this.viewerInPending();
    this.pdfService.getPage(page);
  }
}
