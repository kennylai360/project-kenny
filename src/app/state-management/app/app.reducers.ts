import { IAppState } from './app-state.interface';
import { Actions, APP_CLOSE_MODAL, APP_OPEN_MODAL } from './app.actions';

export const appInitialState: IAppState = {
  hasModalOpen: false
};

export function appReducer(state: IAppState = appInitialState,
                           action: Actions): IAppState {
  switch (action.type) {

    case APP_OPEN_MODAL:
      return {
        ...state,
        hasModalOpen: true
      };

    case APP_CLOSE_MODAL:
      return {
        ...state,
        hasModalOpen: false
      };

    default: {
      return state;
    }
  }
}
