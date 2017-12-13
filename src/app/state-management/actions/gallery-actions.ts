import { Action } from '@ngrx/store';

/* tslint:disable */
export const GALLERY_LOAD_DATA: string = '[Gallery] LOAD DATA';
/* tslint:enable */

export class GalleryLoadDataAction implements Action {
  public readonly type = GALLERY_LOAD_DATA; // tslint:disable-line
}

export type Actions =
  GalleryLoadDataAction;
