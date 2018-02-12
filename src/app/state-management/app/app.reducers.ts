import { IAppState } from './app-state.interface';
import { Actions, APP_CLOSE_MODAL, APP_OPEN_MODAL, APP_UPDATE_SELECTED_IMAGE, APP_UPDATE_SELECTED_IMAGE_ID } from './app.actions';

export const appInitialState: IAppState = {
  hasModalOpen: false,
  selectedImage: '',
  selectedImageId: null,
  selectedImageHorizontalOrient: false
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

    case APP_UPDATE_SELECTED_IMAGE_ID:
      return {
        ...state,
        selectedImageId: action.payload
      };

    case APP_UPDATE_SELECTED_IMAGE:
      return {
        ...state,
        selectedImage: action.imageUrl,
        selectedImageId: action.imageId,
        selectedImageHorizontalOrient: action.imageHorizontalOrient
      };

    default: {
      return state;
    }
  }
}
