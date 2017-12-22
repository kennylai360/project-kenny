import { NgModule } from '@angular/core';
import { GalleryAlbumCoverComponent } from './gallery-album-cover.component';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GalleryAlbumCoverComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    LazyLoadImageModule
  ],
  exports: [
    GalleryAlbumCoverComponent
  ],
  providers: []
})
export class GalleryAlbumCoverModule {
}
