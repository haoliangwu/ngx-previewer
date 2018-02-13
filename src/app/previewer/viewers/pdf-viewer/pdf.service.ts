import { Injectable } from '@angular/core';
import { PDFDocumentProxy, PDFJS, PDFPageProxy, PDFPageViewport, PDFRenderTask } from 'pdfjs-dist';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Subject } from 'rxjs/Subject';
import { map, switchMap, combineLatest } from 'rxjs/operators';

export interface RenderContext {
  canvasContext: CanvasRenderingContext2D;
  viewport: PDFPageViewport;
}

export interface RenderContextWithPage {
  page: PDFPageProxy;
  context: RenderContext;
}

@Injectable()
export class PdfService {
  private page$ = new Subject<number>();

  constructor() { }

  load(url: string): Observable<PDFPageProxy> {
    const loadingTask$ = fromPromise(this.loadDocument(url));
    const load$ = loadingTask$.pipe(
      combineLatest(this.page$),
      switchMap(([pdf, page]) => this.loadPage(pdf, page))
    );

    return load$;
  }

  getPage(page: number): void {
    this.page$.next(page);
  }

  render(page: PDFPageProxy, context: RenderContext) {
    return fromPromise(this.renderPage(page, context));
  }

  autoFitViewportScale(viewport: PDFPageViewport, rect: [number, number]): number {
    const scaleX = rect[0] / viewport.width;
    const scaleY = rect[1] / viewport.height;

    return scaleY > scaleX ? scaleX > 1 ? 1 : scaleX : scaleY > 1 ? 1 : scaleY;
  }

  private loadDocument(url: string): Promise<PDFDocumentProxy> {
    return new Promise<PDFDocumentProxy>((resolve, reject) => {
      PDFJS.getDocument(url).then(resolve, reject);
    });
  }

  private loadPage(pdf: PDFDocumentProxy, page: number): Promise<PDFPageProxy> {
    return new Promise<PDFPageProxy>((resolve, reject) => {
      pdf.getPage(page).then(resolve, reject);
    });
  }

  private renderPage(page: PDFPageProxy, context: RenderContext): Promise<PDFPageProxy> {
    return new Promise<PDFPageProxy>((resolve, reject) => {
      page.render(context).then(resolve, reject);
    });
  }
}
