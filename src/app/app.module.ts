import { NgModule } from '@angular/core';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { listOfReducers } from './state-management/ngrx-index';

import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { Actions, EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './state-management/gallery-list/gallery.effects';
import { GalleryFacade } from './state-management/gallery-list/gallery.facade';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import { AppFacade } from './state-management/app/app.facade';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { GalleryAlbumCoverComponent } from './components/gallery-album-cover/gallery-album-cover.component';
import { GalleryAlbumJumbotronComponent } from './components/gallery-album-jumbotron/gallery-album-jumbotron.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { appRoutes } from './app.routes';

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
