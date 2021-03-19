import { ActionReducerMap } from '@ngrx/store';
import { IGalleryState } from './gallery-list/gallery-state.interface';
import { IAppState } from './app/app-state.interface';
import { appReducer } from './app/app.reducers';
import { galleryReducer } from './gallery-list/gallery.reducers';

// one source of truth here.
export interface IndexState {
  app?: IAppState;
  gallery?: IGalleryState;
}

// Mapping of the reducers
export const listOfReducers: ActionReducerMap<IndexState> = {
  app: appReducer,
  gallery: galleryReducer
};
