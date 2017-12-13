import { Actions, EVENT_FROM_EFFECT, INCREMENT } from '../actions/counter-actions';
import { GALLERY_LOAD_DATA } from '../actions/gallery-actions';

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
    case GALLERY_LOAD_DATA: {
      return {
        ...state
        //load data from payload USING EFFECT
        //WORK FROM HERE // TODO
      };
    }

    default: {
      return state;
    }
  }
}
