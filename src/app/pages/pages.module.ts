import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { DemoLazyloadingImagesComponent } from './demo-lazyloading-images/demo-lazyloading-images.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    GalleriesComponent,
    DemoLazyloadingImagesComponent
  ],
  imports: [
    NgxPaginationModule
  ],
  exports: [
    ProfileComponent,
    HomeComponent,
    GalleriesComponent,
    DemoLazyloadingImagesComponent
  ],
  providers: []
})
export class PagesModule {
}
