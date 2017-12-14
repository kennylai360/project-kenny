import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriesModule } from './galleries/galleries.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { DemoLazyloadingImagesModule } from './demo-lazyloading-images/demo-lazyloading-images.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    ProfileModule,
    GalleriesModule,
    DemoLazyloadingImagesModule,
  ],
  exports: [
  ],
  providers: []
})
export class PagesModule {
}
