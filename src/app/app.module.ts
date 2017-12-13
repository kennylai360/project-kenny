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
import { CounterFacade } from './state-management/facade/counter-facade';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { MDBBootstrapModulePro } from './typescripts/pro/index';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DemoLazyloadingImagesComponent } from './demo-lazyloading-images/demo-lazyloading-images.component';
import { GalleryCoverComponent } from './gallery-cover/gallery-cover.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { environment } from '../environments/environment';
import { storeLogger } from 'ngrx-store-logger';

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
    LazyLoadImageModule,
    NgxPaginationModule
  ],
  exports: [
  ],
  providers: [
    CounterFacade,
    HttpClient
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}

