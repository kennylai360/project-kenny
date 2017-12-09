import 'hammerjs';
import 'mousetrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { listOfReducers } from './state-management/ngrx-index';
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



const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'galleries',
    component: GalleriesComponent
  },
  {
    path: 'lazyloadingimagesdemo',
    component: DemoLazyloadingImagesComponent
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    GalleryCoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(listOfReducers),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    LazyLoadImageModule
  ],
  exports: [
  ],
  providers: [
    CounterFacade
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
