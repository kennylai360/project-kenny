import {} from './gallery.actions';
import { IGalleryState } from './gallery-state.interface';
import { IGalleryCover } from './gallery-cover.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  GalleryLoadDataAction,
  GalleryLoadDataSuccessAction,
  GallerySetSelectedAlbumIdAction,
  GalleryGetDataByIdSuccessAction,
} from './gallery.actions';

export const galleryInitialState: IGalleryState = {
  galleryData: [],
  selectedAlbumId: null,
  selectedAlbum: {} as IGalleryCover,
};

const reducer = createReducer(
  galleryInitialState,

  on(GalleryLoadDataAction, (state) => ({
    ...state,
  })),

  on(GalleryLoadDataSuccessAction, (state, action) => ({
    ...state,
    galleryData: action.payload,
  })),

  on(GallerySetSelectedAlbumIdAction, (state, action) => ({
    ...state,
    selectedAlbumId: action.payload,
  })),

  on(GalleryGetDataByIdSuccessAction, (state, action) => {
    const descendingAlbumImagesOrder = action.payload.albumImages
      .slice() // create a completely new object so there's no immutability issues
      .sort((a, b) => {
        return a.imageId < b.imageId ? 1 : a.imageId > b.imageId ? -1 : 0;
      });

    return {
      ...state,
      selectedAlbum: {
        ...action.payload,
        albumImages: descendingAlbumImagesOrder,
      },
    };
  })
);

export function galleryReducer(
  state: IGalleryState | undefined,
  action: Action
) {
  return reducer(state, action);
}
