import 'hammerjs';
import 'mousetrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionReducer, State, StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexState, listOfReducers } from './state-management/ngrx-index';
import { CounterFacade } from './state-management/counter/counter-facade';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleriesComponent } from './pages/galleries/galleries.component';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DemoLazyloadingImagesComponent } from './pages/demo-lazyloading-images/demo-lazyloading-images.component';
import { GalleryCoverComponent } from './components/gallery-cover/gallery-cover.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './pages/profile/profile.component';
import { environment } from '../environments/environment';
import { storeLogger } from 'ngrx-store-logger';
import { Actions, EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './state-management/gallery-list/gallery.effects';
import { EffectsRootModule } from '@ngrx/effects/src/effects_root_module';
import { GalleryFacade } from './state-management/gallery-list/gallery.facade';

export function logger(reducer: ActionReducer<IndexState>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];


const appRoutes: Routes = [
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
    component: GalleriesComponent
  },
  {
    path: 'lazyloadingimagesdemo',
    component: DemoLazyloadingImagesComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GalleriesComponent,
    DemoLazyloadingImagesComponent,
    GalleryCoverComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(listOfReducers, {metaReducers}),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    EffectsModule.forRoot([
      GalleryEffects
    ]),
    LazyLoadImageModule,
    NgxPaginationModule
  ],
  exports: [
  ],
  providers: [
    CounterFacade,
    GalleryFacade,
    HttpClient,
    Actions,
    EffectsRootModule,
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}

