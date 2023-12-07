import { IAppState } from './app-state.interface';
import {
  UpdateModalSelectedImageAction,
  UpdateModalSelectedImageIdAction,
  CloseModalAction,
  OpenModalAction,
} from './app.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const appInitialState: IAppState = {
  hasModalOpen: false,
  selectedImage: '',
  selectedImageId: null,
  selectedImageHorizontalOrient: false,
};

const reducer = createReducer(
  appInitialState,

  on(OpenModalAction, (state) => ({
    ...state,
    hasModalOpen: true,
  })),

  on(CloseModalAction, (state) => ({
    ...state,
    hasModalOpen: false,
    selectedImage: '',
    selectedImageId: null,
  })),

  on(UpdateModalSelectedImageIdAction, (state, action) => ({
    ...state,
    selectedImageId: action.payload,
  })),

  on(UpdateModalSelectedImageAction, (state, action) => ({
    ...state,
    selectedImage: action.payload.imageUrl,
    selectedImageId: action.payload.imageId,
    selectedImageHorizontalOrient: action.payload.imageHorizontalOrient,
  }))
);

export function appReducer(state: IAppState | undefined, action: Action) {
  return reducer(state, action);
}
