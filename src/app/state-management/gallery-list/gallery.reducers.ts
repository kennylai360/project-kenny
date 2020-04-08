import {
  Actions, GALLERY_LOAD_DATA, GALLERY_LOAD_DATA_BY_ID, GALLERY_LOAD_DATA_BY_ID_SUCCESS, GALLERY_LOAD_DATA_SUCCESS,
  GALLERY_SET_SELECTED_ID
} from './gallery.actions';
import { IGalleryState } from './gallery-state.interface';
import { IGalleryCover } from './gallery-cover.interface';

export const galleryInitialState: IGalleryState = {
  galleryData:  [],
  selectedAlbumId: null,
  selectedAlbum: {} as IGalleryCover
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

    case GALLERY_SET_SELECTED_ID:
      return {
        ...state,
        selectedAlbumId: action.payload
      };

    case GALLERY_LOAD_DATA_BY_ID_SUCCESS:

      const descendingAlbumImagesOrder = action.payload.albumImages
        .slice() // create a completely new object so there's no immutability issues
        .sort((a, b) => {
        return (a.imageId < b.imageId) ? 1 : (a.imageId > b.imageId) ? -1 : 0;
      });

      return {
        ...state,
        selectedAlbum: {
          ...action.payload,
          albumImages: descendingAlbumImagesOrder
        }
      };

    default: {
      return state;
    }
  }
}
