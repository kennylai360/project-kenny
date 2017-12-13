import { Actions, GALLERY_LOAD_DATA, GALLERY_LOAD_DATA_SUCCESS } from './gallery-actions';
import { IGalleryState } from './gallery-state.interface';

export const galleryInitialState: IGalleryState = {
  galleryData:  []
};


export function galleryReducer(state: IGalleryState = galleryInitialState,
                               action: Actions): IGalleryState {
  switch (action.type) {

    case GALLERY_LOAD_DATA:
      return {
        ...state
      };

    case GALLERY_LOAD_DATA_SUCCESS:
      return {
        ...state,
        galleryData: action.payload
      };

    default: {
      return state;
    }
  }
}
