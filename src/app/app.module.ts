import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { listOfReducers } from './state-management/ngrx-index';
import { CounterFacade } from './state-management/facade/counter-facade';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { PkInputSearchComponent } from './components/pk-input-search/pk-input-search.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'galleries',
    component: PkInputSearchComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: PkInputSearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PkInputSearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(listOfReducers),
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
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
