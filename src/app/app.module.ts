import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NgxPreviewModule, DEFAULT_VIEWER_COMPS } from './previewer/index';
import { DefaultViewerComponent } from './previewer/viewers/index';
import { LoadingMaskModule } from 'ngx-loading-mask';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPreviewModule.forRoot({}, DEFAULT_VIEWER_COMPS),
    LoadingMaskModule.forRoot({
      snippet: {
        imgUrl: 'http://littlelyon.com/ngx-loading-mask/assets/ripple.svg',
        size: 144
      }
    }),
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
