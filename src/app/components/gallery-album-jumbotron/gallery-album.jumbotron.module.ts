import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GalleryAlbumJumbotronComponent } from './gallery-album-jumbotron.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    GalleryAlbumJumbotronComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    LazyLoadImageModule
  ],
  exports: [
    GalleryAlbumJumbotronComponent
  ],
  providers: []
})
export class GalleryAlbumJumbotronModule {
}
