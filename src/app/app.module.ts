import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { AppMaterialsModule } from './app.materials.module';
import { listOfReducers } from './state-management/ngrx-index';
import { CounterFacade } from './state-management/facade/counter-facade';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialsModule,
    StoreModule.forRoot(listOfReducers),
    FormsModule,
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
