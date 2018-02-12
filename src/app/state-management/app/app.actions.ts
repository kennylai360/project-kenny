/* tslint:disable */
/* tslint:enable */
import { Action } from '@ngrx/store';
/* tslint:disable */
export const APP_OPEN_MODAL = '[App] Open modal';
export const APP_CLOSE_MODAL = '[App] Close modal';
export const APP_UPDATE_SELECTED_IMAGE_ID = '[App] Update selected image id';
export const APP_UPDATE_SELECTED_IMAGE = '[App] Update selected image';
/* tslint:enable */

export class OpenModalAction implements Action {
  public readonly type = APP_OPEN_MODAL; // tslint:disable-line
}

export class CloseModalAction implements Action {
  public readonly type = APP_CLOSE_MODAL; // tslint:disable-line
}

export class UpdateModalSelectedImageId implements Action {
  public readonly type = APP_UPDATE_SELECTED_IMAGE_ID; // tslint:disable-line

  constructor(public payload: number) {}
}

export class UpdateModalSelectedImage implements Action {
  public readonly type = APP_UPDATE_SELECTED_IMAGE; // tslint:disable-line

  constructor(public imageUrl: string,
              public imageId: number,
              public imageHorizontalOrient: boolean) {}
}

export type Actions = OpenModalAction
  | CloseModalAction
  | UpdateModalSelectedImageId
  | UpdateModalSelectedImage;
