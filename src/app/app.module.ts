import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { listOfReducers } from './state-management/ngrx-index';
import { CounterFacade } from './state-management/facade/counter-facade';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    StoreModule.forRoot(listOfReducers),
    FormsModule,
  ],
  exports: [
  ],
  providers: [
    CounterFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
