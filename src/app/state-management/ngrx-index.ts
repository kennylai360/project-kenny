import { counterReducer, CounterState } from './reducers/counter.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { galleryReducer } from './reducers/gallery.reducers';
import { IGalleryState } from './interface/gallery-state.interface';

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
