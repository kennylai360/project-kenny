import { Actions, GALLERY_LOAD_DATA, GALLERY_LOAD_DATA_SUCCESS } from '../actions/gallery-actions';

export interface IGalleryContent {
  imgUrl: string;
  coverTitle: string;
  translateX: number;
  translateY: number;
}

export interface GalleryState {
  galleryList: IGalleryContent[];
}

export const galleryInitialState: GalleryState = {
  galleryList:  []
};


export function galleryReducer(state: GalleryState = galleryInitialState, action: Actions): GalleryState {
  switch (action.type) {

    case GALLERY_LOAD_DATA:
      return {
        ...state
      };

    case GALLERY_LOAD_DATA_SUCCESS:
      return {
        ...state,
        galleryList: action.payload
      };

    default: {
      return state;
    }
  }
}
