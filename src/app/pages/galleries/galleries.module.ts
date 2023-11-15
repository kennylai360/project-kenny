import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GalleryAlbumComponent } from './gallery-album/gallery-album.component'
import { RouterModule } from '@angular/router'
import { GalleryAlbumListingComponent } from './gallery-album-listing/gallery-album-listing.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { OverlayContainerComponent } from '../../components/overlay/overlay-container/overlay-container.component'
import { GalleryAlbumCoverComponent } from '../../components/gallery-album-cover/gallery-album-cover.component'
import { GalleryAlbumJumbotronComponent } from '../../components/gallery-album-jumbotron/gallery-album-jumbotron.component'

@NgModule({
  declarations: [GalleryAlbumListingComponent, GalleryAlbumComponent],
  imports: [
    CommonModule,
    GalleryAlbumCoverComponent,
    GalleryAlbumJumbotronComponent,
    RouterModule,
    OverlayContainerComponent,
    NgxPaginationModule,
  ],
  exports: [GalleryAlbumListingComponent, GalleryAlbumComponent],
  providers: [],
})
export class GalleriesModule {}
