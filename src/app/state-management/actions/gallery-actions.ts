import { Action } from '@ngrx/store';
import { IGalleryContent } from '../reducers/gallery-reducers';

/* tslint:disable */
export const GALLERY_LOAD_DATA: string = '[Gallery] LOAD DATA';
export const GALLERY_LOAD_DATA_SUCCESS: string = '[Gallery] LOAD DATA SUCCESS';
/* tslint:enable */

export class GalleryLoadDataAction implements Action {
  public readonly type = GALLERY_LOAD_DATA; // tslint:disable-line
}

export class GalleryLoadDataActionSuccess implements Action {
  public readonly type = GALLERY_LOAD_DATA_SUCCESS;

  constructor(public payload: IGalleryContent[]) {}
}

export type Actions = GalleryLoadDataAction
  | GalleryLoadDataActionSuccess;
