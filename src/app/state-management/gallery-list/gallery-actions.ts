import { Action } from '@ngrx/store';
import { IGalleryCover } from './gallery-cover.interface';
/* tslint:disable */
export const GALLERY_LOAD_DATA = '[Gallery] Load Gallery Data';
export const GALLERY_LOAD_DATA_SUCCESS = '[Gallery] Load Gallery Data Success';
export const GALLERY_LOAD_DATA_FAILURE = '[Gallery] Load Gallery Data Failure';
export const GALLERY_LOAD_DATA_BY_ID = '[Gallery] Load Album Data by ID';
export const GALLERY_SET_SELECTED_ID = '[Gallery] Set selected id in store';
export const GALLERY_LOAD_DATA_BY_ID_SUCCESS = '[Gallery] Load Album Data by ID Success';
export const GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE = '[Gallery] Redirect back to Albums page';
/* tslint:enable */

export class GalleryLoadDataAction implements Action {
  public readonly type = GALLERY_LOAD_DATA; // tslint:disable-line
}

export class GalleryLoadDataSuccessAction implements Action {
  public readonly type = GALLERY_LOAD_DATA_SUCCESS; // tslint:disable-line

  constructor(public payload: IGalleryCover[]) {}
}

export class GalleryLoadDataFailureAction implements Action {
  public readonly type = GALLERY_LOAD_DATA_FAILURE; // tslint:disable-line

  constructor(public error: any) {}
}

export class GallerySetSelectedAlbumIdAction implements Action {
  public readonly type = GALLERY_SET_SELECTED_ID;

  constructor(public payload: number) {}
}

export class GalleryGetDataByIdAction implements Action {
  public readonly type = GALLERY_LOAD_DATA_BY_ID; // tslint:disable-line
}

export class GalleryGetDataByIdSuccessAction implements Action {
  public readonly type = GALLERY_LOAD_DATA_BY_ID_SUCCESS;

  constructor(public payload: IGalleryCover) {}
}

export class GalleryRedirectBackToAlbumListPageAction implements Action {
  public readonly type = GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE;
}



export type Actions = GalleryLoadDataAction
  | GalleryLoadDataSuccessAction
  | GalleryLoadDataFailureAction
  | GalleryGetDataByIdAction
  | GallerySetSelectedAlbumIdAction
  | GalleryGetDataByIdSuccessAction
  | GalleryRedirectBackToAlbumListPageAction;
