import { counterReducer, CounterState } from './reducers/counter-reducers';
import { ActionReducer, ActionReducerMap, combineReducers, compose } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

// one source of truth here.
export interface IndexState {
  counter?: CounterState;
}

// Mapping of the reducers
export const listOfReducers: ActionReducerMap<IndexState> = {
  counter: counterReducer
};

const developmentReducer: ActionReducer<IndexState> = compose(storeFreeze, combineReducers)(listOfReducers);
const productionReducer: ActionReducer<IndexState> = combineReducers(listOfReducers);

export function indexReducer(state: IndexState, action: any): any {
    return developmentReducer(state, action);
  }
