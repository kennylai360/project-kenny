import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryAlbumCoverModule } from '../../components/gallery-album-cover/gallery-album-cover.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleryAlbumComponent } from './gallery-album/gallery-album.component';
import { RouterModule } from '@angular/router';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { GalleryAlbumListingComponent } from './gallery-album-listing/gallery-album-listing.component';

@NgModule({
  declarations: [
    GalleryAlbumListingComponent,
    GalleryAlbumComponent,
    GallerySectionComponent
  ],
  imports: [
    CommonModule,
    GalleryAlbumCoverModule,
    NgxPaginationModule,
    RouterModule
  ],
  exports: [
    GalleryAlbumListingComponent,
    GalleryAlbumComponent,
    GallerySectionComponent
  ],
  providers: []
})
export class GalleriesModule {
}
