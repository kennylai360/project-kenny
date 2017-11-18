import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { AppMaterialsModule } from './app.materials.module';
import { mainReducer } from './state-management/reducers/reducers';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialsModule,
    StoreModule.forRoot({mainReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
