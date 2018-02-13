import { Component, Input, OnChanges, SimpleChanges, Host, Injector, ComponentFactoryResolver, OnInit, ComponentRef, Renderer2, ViewContainerRef, ComponentFactory } from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';

import { BaseViewerComponent } from './viewers/index';
import { ReaderService } from './reader.service';
import { ViewerService } from './viewer.service';
import { getBlockElementRect } from './utils/dom';
import { viewerConfig } from './model/config';

@Component({
  selector: 'ngx-preview-container',
  template: ''
})
export class PreviewContainerComponent implements OnInit, OnChanges {

  @Input() file: File;

  width: number;
  height: number;
  private portalHost: DomPortalHost;
  private compRef: ComponentRef<BaseViewerComponent>;
  private $container: HTMLElement;

  constructor(
    private cfResolver: ComponentFactoryResolver,
    private injector: Injector,
    public renderer2: Renderer2,
    public vcRef: ViewContainerRef,
    private viewerService: ViewerService
  ) {
    this.$container = vcRef.element.nativeElement.parentElement;
  }

  ngOnInit() {
    const { width, height } = getBlockElementRect(this.$container);

    this.width = width;
    this.height = height;

    this.renderer2.setStyle(this.$container, 'position', 'relative');
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.file && change.file.currentValue) {
      this.detach();
      this.attach(change.file.currentValue);
    }
  }

  mountViewer(file: File): ComponentRef<any> {
    const rule = this.viewerService.getViewerRule(file);
    const factory: ComponentFactory<any> = this.cfResolver.resolveComponentFactory(rule.viewer);
    const injector = Injector.create([
      {
        provide: viewerConfig,
        useValue: rule.config
      }
    ], this.injector);

    return factory.create(injector);
  }

  attach(file: File) {
    this.compRef = this.mountViewer(file);
    this.compRef.onDestroy(() => this.compRef = null);

    if (typeof this.compRef.instance.loadFile === 'function') {
      this.compRef.instance.loadFile(file);
    }

    this.vcRef.insert(this.compRef.hostView);
  }

  detach() {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }
}
