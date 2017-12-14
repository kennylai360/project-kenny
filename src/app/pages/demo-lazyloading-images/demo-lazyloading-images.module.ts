import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLazyloadingImagesComponent } from './demo-lazyloading-images.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    DemoLazyloadingImagesComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule
  ],
  exports: [
    DemoLazyloadingImagesComponent
  ],
  providers: []
})
export class DemoLazyloadingImagesModule {
}
