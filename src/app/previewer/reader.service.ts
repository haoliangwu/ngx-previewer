import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class ReaderService {
  currentFile: File;
  fileReader = new FileReader();

  constructor() { }

  abort() {
    this.fileReader.abort();
  }

  readAsArrayBuffer(file: File) {
    this.currentFile = file;
    this.fileReader.readAsArrayBuffer(file);
  }

  readAsBinaryString(file: File) {
    this.currentFile = file;
    this.fileReader.readAsBinaryString(file);
  }

  readAsDataURL(file: File) {
    this.currentFile = file;
    this.fileReader.readAsDataURL(file);
  }

  readAsText(file: File, encoding = 'utf-8') {
    this.currentFile = file;
    this.fileReader.readAsText(file, encoding);
  }

  createObjectURL(file: File) {
    this.currentFile = file;
    return URL.createObjectURL(file);
  }

  revokeObjectURL(url: string) {
    return URL.revokeObjectURL(url);
  }

  onAbort() {
    return fromEvent<ProgressEvent>(this.fileReader, 'abort');
  }

  onError() {
    return fromEvent<ProgressEvent>(this.fileReader, 'error');
  }

  onLoadStart() {
    return fromEvent<ProgressEvent>(this.fileReader, 'loadstart');
  }

  onProgress() {
    return fromEvent<ProgressEvent>(this.fileReader, 'progress');
  }

  onLoad(): Observable<string | ArrayBuffer> {
    return fromEvent<ProgressEvent>(this.fileReader, 'load').pipe(
      map(e => (e.target as FileReader).result),
      distinctUntilChanged()
    );
  }

  onLoadEnd() {
    return fromEvent<ProgressEvent>(this.fileReader, 'loadend');
  }
}
