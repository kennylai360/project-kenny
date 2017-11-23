import { counterReducer, CounterState } from './reducers/counter-reducers';
import { ActionReducerMap } from '@ngrx/store';

// one source of truth here.
export interface IndexState {
  counter?: CounterState;
}

// Mapping of the reducers
export const listOfReducers: ActionReducerMap<IndexState> = {
  counter: counterReducer
};
