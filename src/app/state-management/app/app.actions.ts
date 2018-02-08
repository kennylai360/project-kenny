/* tslint:disable */
/* tslint:enable */
import { Action } from '@ngrx/store';
/* tslint:disable */
export const APP_OPEN_MODAL = '[App] Open modal';
export const APP_CLOSE_MODAL = '[App] Close modal';
/* tslint:enable */

export class OpenModalAction implements Action {
  public readonly type = APP_OPEN_MODAL; // tslint:disable-line
}

export class CloseModalAction implements Action {
  public readonly type = APP_CLOSE_MODAL; // tslint:disable-line
}

export type Actions = OpenModalAction
  | CloseModalAction;
