import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';

@Directive({
  selector: '[ngxPreviewContainer]'
})
export class PreviewContainerDirective implements OnChanges {

  @Input('ngxPreviewContainer') file;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {
    if (change.file) {
      // TODO preview file
    }
  }
}
