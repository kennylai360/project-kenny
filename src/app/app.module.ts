import { NgModule } from '@angular/core';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { listOfReducers } from './state-management/ngrx-index';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { environment } from '../environments/environment';
import { Actions, EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './state-management/gallery-list/gallery.effects';
import { GalleryFacade } from './state-management/gallery-list/gallery.facade';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { GallerySectionComponent } from './pages/galleries/gallery-section/gallery-section.component';
import { GalleryAlbumListingComponent } from './pages/galleries/gallery-album-listing/gallery-album-listing.component';
import { GalleryAlbumComponent } from './pages/galleries/gallery-album/gallery-album.component';
import { AppFacade } from './state-management/app/app.facade';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { GalleryAlbumCoverComponent } from './components/gallery-album-cover/gallery-album-cover.component';
import { GalleryAlbumJumbotronComponent } from './components/gallery-album-jumbotron/gallery-album-jumbotron.component';
import { NotFoundComponent } from './pages/notFound/notFound.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { TableComponent } from './pages/table/table.component';

export function metaReducerLogger(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state: any, action: any) => {
    console.groupCollapsed(action.type);
    const nextState = reducer(state, action);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(
      `%c next state`,
      `color: #4CAF50; font-weight: bold`,
      nextState
    );
    console.groupEnd();
    return nextState;
  };
}

export const metaReducers = environment.production ? [] : [metaReducerLogger];

const appRoutes: Routes = [
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

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HeaderComponent,
    PagesModule,
    GalleryAlbumCoverComponent,
    GalleryAlbumJumbotronComponent,
    ConverterComponent,
    FooterComponent,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(listOfReducers, { metaReducers }),
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
    EffectsModule.forRoot([GalleryEffects]),
  ],
  declarations: [AppComponent],
  providers: [
    AppFacade,
    GalleryFacade,
    HttpClient,
    Actions,
    DeviceDetectorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
