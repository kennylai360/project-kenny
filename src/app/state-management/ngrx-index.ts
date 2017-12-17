import { counterReducer, CounterState } from './counter/counter.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { galleryReducer } from './gallery-list/gallery.reducers';
import { IGalleryState } from './gallery-list/gallery-state.interface';

// one source of truth here.
export interface IndexState {
  gallery?: IGalleryState;
  counter?: CounterState;
}

// Mapping of the reducers
export const listOfReducers: ActionReducerMap<IndexState> = {
  counter: counterReducer,
  gallery: galleryReducer
};
