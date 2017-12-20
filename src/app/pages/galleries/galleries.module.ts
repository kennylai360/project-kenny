import { NgModule } from '@angular/core';
import { GalleriesComponent } from './galleries.component';
import { CommonModule } from '@angular/common';
import { GalleryCoverModule } from '../../components/gallery-cover/gallery-cover.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleryAlbumComponent } from './gallery-album/gallery-album.component';
import { RouterModule } from '@angular/router';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';

@NgModule({
  declarations: [
    GalleriesComponent,
    GalleryAlbumComponent,
    GallerySectionComponent
  ],
  imports: [
    CommonModule,
    GalleryCoverModule,
    NgxPaginationModule,
    RouterModule
  ],
  exports: [
    GalleriesComponent,
    GalleryAlbumComponent,
    GallerySectionComponent
  ],
  providers: []
})
export class GalleriesModule {
}
