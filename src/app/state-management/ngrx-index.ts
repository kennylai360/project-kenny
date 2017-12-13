import { counterReducer, CounterState } from './reducers/counter-reducers';
import { ActionReducerMap } from '@ngrx/store';
import { galleryReducer, GalleryState } from './reducers/gallery-reducers';

// one source of truth here.
export interface IndexState {
  gallery?: GalleryState;
  counter?: CounterState;
}

// Mapping of the reducers
export const listOfReducers: ActionReducerMap<IndexState> = {
  counter: counterReducer,
  gallery: galleryReducer
};
