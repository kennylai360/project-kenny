import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryAlbumCoverModule } from '../../components/gallery-album-cover/gallery-album-cover.module';
import { GalleryAlbumComponent } from './gallery-album/gallery-album.component';
import { RouterModule } from '@angular/router';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { GalleryAlbumListingComponent } from './gallery-album-listing/gallery-album-listing.component';
import { GalleryAlbumJumbotronModule } from '../../components/gallery-album-jumbotron/gallery-album.jumbotron.module';
import { OverlayContainerModule } from '../../components/overlay/overlay-container/overlay-container.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    GalleryAlbumListingComponent,
    GalleryAlbumComponent,
    GallerySectionComponent
  ],
  imports: [
    CommonModule,
    GalleryAlbumCoverModule,
    GalleryAlbumJumbotronModule,
    RouterModule,
    OverlayContainerModule,
    NgxPaginationModule
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
