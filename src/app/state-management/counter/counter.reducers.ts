import { Actions, EVENT_FROM_EFFECT, INCREMENT } from './counter-actions';

export interface CounterState {
  counterValue:  number;
}

export const counterInitialState: CounterState = {
  counterValue:  10
};


export function counterReducer(state: CounterState = counterInitialState, action: Actions): CounterState {
  switch (action.type) {
    case INCREMENT: {
      return {
        ...state,
        counterValue: state.counterValue + 1
      };
    }

    case EVENT_FROM_EFFECT: {
      return {
        ...state,
        counterValue: state.counterValue + 4
      };
    }

    default: {
      return state;
    }
  }
}
