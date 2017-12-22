import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryAlbumCoverModule } from './gallery-album-cover/gallery-album-cover.module';
import { GalleryAlbumJumbotronModule } from './gallery-album-jumbotron/gallery-album.jumbotron.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    GalleryAlbumCoverModule,
    GalleryAlbumJumbotronModule
  ],
  exports: [
  ],
  providers: []
})
export class ComponentsModule {
}
