import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ReaderService {
  currentFile: File;
  fileReader = new FileReader();
  img = new Image();
  objectURL: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  abort() {
    this.fileReader.abort();
  }

  readAsImg(file: File) {
    this.createObjectURL(file);

    this.img.src = this.objectURL;
  }

  readAsArrayBuffer(file: File): void {
    this.currentFile = file;
    this.fileReader.readAsArrayBuffer(file);
  }

  readAsBinaryString(file: File): void {
    this.currentFile = file;
    this.fileReader.readAsBinaryString(file);
  }

  readAsDataURL(file: File): void {
    this.currentFile = file;
    this.fileReader.readAsDataURL(file);
  }

  readAsText(file: File, encoding = 'utf-8'): void {
    this.currentFile = file;
    this.fileReader.readAsText(file, encoding);
  }

  createObjectURL(file: File) {
    this.currentFile = file;
    this.objectURL = URL.createObjectURL(file);
  }

  revokeObjectURL() {
    URL.revokeObjectURL(this.objectURL);
  }

  onFileReaderAbort() {
    return fromEvent<ProgressEvent>(this.fileReader, 'abort');
  }

  onFileReaderError() {
    return fromEvent<ProgressEvent>(this.fileReader, 'error');
  }

  onFileReaderLoadStart() {
    return fromEvent<ProgressEvent>(this.fileReader, 'loadstart');
  }

  onFileReaderProgress() {
    return fromEvent<ProgressEvent>(this.fileReader, 'progress');
  }

  onFileReaderLoad(): Observable<string | ArrayBuffer> {
    return fromEvent<ProgressEvent>(this.fileReader, 'load').pipe(
      map(e => (e.target as FileReader).result),
      distinctUntilChanged()
    );
  }

  onFileReaderLoadEnd() {
    return fromEvent<ProgressEvent>(this.fileReader, 'loadend');
  }

  onImageLoad() {
    return fromEvent<Event>(this.img, 'load');
  }

  onImageError() {
    return fromEvent<Event>(this.img, 'error');
  }
}
