import { createAction, props} from '@ngrx/store';
import { IGalleryCover } from './gallery-cover.interface';

export enum GalleryActionTypes {
  GALLERY_LOAD_DATA = '[Gallery] Load Gallery Data',
  GALLERY_LOAD_DATA_SUCCESS = '[Gallery] Load Gallery Data Success',
  GALLERY_LOAD_DATA_FAILURE = '[Gallery] Load Gallery Data Failure',
  GALLERY_LOAD_DATA_BY_ID = '[Gallery] Load Album Data by ID',
  GALLERY_SET_SELECTED_ID = '[Gallery] Set selected id in store',
  GALLERY_LOAD_DATA_BY_ID_SUCCESS = '[Gallery] Load Album Data by ID Success',
  GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE = '[Gallery] No Album exist - Redirect back to Albums page',
}

export const GalleryLoadDataAction = createAction(
  GalleryActionTypes.GALLERY_LOAD_DATA
);

export const GalleryLoadDataSuccessAction = createAction(
  GalleryActionTypes.GALLERY_LOAD_DATA_SUCCESS,
  props<{ payload: Array<IGalleryCover> }>()
);

export const GalleryLoadDataFailureAction = createAction(
  GalleryActionTypes.GALLERY_LOAD_DATA_FAILURE,
  props<{ payload: any }>()
);

export const GallerySetSelectedAlbumIdAction = createAction(
  GalleryActionTypes.GALLERY_SET_SELECTED_ID,
  props<{ payload: string }>()
);

export const GalleryGetDataByIdAction = createAction(
  GalleryActionTypes.GALLERY_LOAD_DATA_BY_ID
);

export const GalleryGetDataByIdSuccessAction = createAction(
  GalleryActionTypes.GALLERY_LOAD_DATA_BY_ID_SUCCESS,
  props<{ payload: IGalleryCover }>()
);

export const GalleryRedirectBackToAlbumListPageAction = createAction(
  GalleryActionTypes.GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE
);

