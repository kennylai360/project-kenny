import { Action } from '@ngrx/store';
import { IGalleryCover } from '../interface/gallery-cover.interface';
/* tslint:disable */
export const GALLERY_LOAD_DATA = '[Gallery] Load Gallery Data';
export const GALLERY_LOAD_DATA_SUCCESS = '[Gallery] Load Gallery Data Success';
export const GALLERY_LOAD_DATA_FAILURE = '[Gallery] Load Gallery Data Failure';
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

export type Actions = GalleryLoadDataAction
  | GalleryLoadDataSuccessAction
  | GalleryLoadDataFailureAction;
