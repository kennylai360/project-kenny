import 'hammerjs';
import 'mousetrap';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexState, listOfReducers } from './state-management/ngrx-index';
import { CounterFacade } from './state-management/counter/counter-facade';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { DemoLazyloadingImagesComponent } from './pages/demo-lazyloading-images/demo-lazyloading-images.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { environment } from '../environments/environment';
import { storeLogger } from 'ngrx-store-logger';
import { Actions, EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './state-management/gallery-list/gallery.effects';
import { EffectsRootModule } from '@ngrx/effects/src/effects_root_module';
import { GalleryFacade } from './state-management/gallery-list/gallery.facade';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { HeaderModule } from './components/header/header.module';
import { CommonModule } from '@angular/common';
import { FooterModule } from './components/footer/footer.module';
import { GallerySectionComponent } from './pages/galleries/gallery-section/gallery-section.component';
import { GalleryAlbumListingComponent } from './pages/galleries/gallery-album-listing/gallery-album-listing.component';
import { GalleryAlbumComponent } from './pages/galleries/gallery-album/gallery-album.component';
import { AppFacade } from './state-management/app/app.facade';
import { NgxPaginationModule } from 'ngx-pagination';

export function logger(reducer: ActionReducer<IndexState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];


const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'photography',
    component: GallerySectionComponent,
    children: [
      { path: '', component: GalleryAlbumListingComponent },
      { path: ':id', component: GalleryAlbumComponent, data: {
      } },
    ]
  },
  {
    path: 'lazyloadingimagesdemo',
    component: DemoLazyloadingImagesComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HeaderModule,
    PagesModule,
    ComponentsModule,
    FooterModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(listOfReducers, {metaReducers}),
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    EffectsModule.forRoot([GalleryEffects])
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppFacade,
    CounterFacade,
    GalleryFacade,
    HttpClient,
    Actions
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}

