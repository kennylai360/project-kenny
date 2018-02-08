import { counterReducer, CounterState } from './counter/counter.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { galleryReducer } from './gallery-list/gallery.reducers';
import { IGalleryState } from './gallery-list/gallery-state.interface';
import { IAppState } from './app/app-state.interface';
import { appReducer } from './app/app.reducers';

// one source of truth here.
export interface IndexState {
  app?: IAppState;
  gallery?: IGalleryState;
  counter?: CounterState;
}

// Mapping of the reducers
export const listOfReducers: ActionReducerMap<IndexState> = {
  app: appReducer,
  counter: counterReducer,
  gallery: galleryReducer
};
