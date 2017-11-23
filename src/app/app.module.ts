import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { AppMaterialsModule } from './app.materials.module';
import { listOfReducers } from './state-management/ngrx-index';
import { CounterFacade } from './state-management/facade/counter-facade';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialsModule,
    StoreModule.forRoot(listOfReducers)
  ],
  exports: [
    AppMaterialsModule
  ],
  providers: [
    CounterFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
