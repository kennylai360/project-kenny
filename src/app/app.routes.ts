import { Routes } from '@angular/router';
import { ConverterComponent } from './pages/converter/converter.component';
import { GalleryAlbumListingComponent } from './pages/galleries/gallery-album-listing/gallery-album-listing.component';
import { GalleryAlbumComponent } from './pages/galleries/gallery-album/gallery-album.component';
import { GallerySectionComponent } from './pages/galleries/gallery-section/gallery-section.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TableComponent } from './pages/table/table.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'resume',
    component: ProfileComponent,
    title: 'Resume',
  },
  {
    path: 'photography',
    component: GallerySectionComponent,
    title: 'Photography',
    children: [
      { path: '', component: GalleryAlbumListingComponent },
      { path: ':id', component: GalleryAlbumComponent },
    ],
  },
  {
    path: 'converter',
    component: ConverterComponent,
    title: 'Converter',
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
