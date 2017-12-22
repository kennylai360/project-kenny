import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GalleryAlbumJumbotronComponent } from './gallery-album-jumbotron.component';

@NgModule({
  declarations: [
    GalleryAlbumJumbotronComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    GalleryAlbumJumbotronComponent
  ],
  providers: []
})
export class GalleryAlbumJumbotronModule {
}
