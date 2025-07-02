import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { GalleryEffects } from './app/state-management/gallery-list/gallery.effects';
import { NotFoundComponent } from './app/pages/notFound/notFound.component';
import { UtilsComponent } from './app/pages/utils/utils.component';
import { ConverterComponent } from './app/pages/converter/converter.component';
import { GalleryAlbumComponent } from './app/pages/galleries/gallery-album/gallery-album.component';
import { GalleryAlbumListingComponent } from './app/pages/galleries/gallery-album-listing/gallery-album-listing.component';
import { GallerySectionComponent } from './app/pages/galleries/gallery-section/gallery-section.component';
import { ProfileComponent } from './app/pages/profile/profile.component';
import { HomeComponent } from './app/pages/home/home.component';
import { withInMemoryScrolling, provideRouter, Routes } from '@angular/router';
import { listOfReducers } from './app/state-management/ngrx-index';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Actions, EffectsModule } from '@ngrx/effects';
import {
  HttpClient,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { GalleryFacade } from './app/state-management/gallery-list/gallery.facade';
import { AppFacade } from './app/state-management/app/app.facade';

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

// Q: What is this for? This was generated when the code was migrated to standalone
// Could just remove the code?
// const nextState = reducer(state, action);
const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'resume',
    component: ProfileComponent,
    title: 'Resume',
  },
  {
    path: 'photography',
    component: GallerySectionComponent,
    title: 'Photography',
    children: [
      { path: '', component: GalleryAlbumListingComponent },
      { path: ':id', component: GalleryAlbumComponent },
    ],
  },
  {
    path: 'converter',
    component: ConverterComponent,
    title: 'Converter',
  },
  {
    path: 'utils',
    component: UtilsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      CommonModule,
      NgxPaginationModule,
      StoreModule.forRoot(listOfReducers, { metaReducers }),
      EffectsModule.forRoot([GalleryEffects])
    ),
    AppFacade,
    GalleryFacade,
    HttpClient,
    Actions,
    DeviceDetectorService,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
  ],
}).catch((err) => console.log(err));
