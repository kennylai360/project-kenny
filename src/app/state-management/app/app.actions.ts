import { createAction, props} from '@ngrx/store';

export interface IUpdateModalImage {
  imageUrl: string;
  imageId: number;
  imageHorizontalOrient: boolean;
}

export enum AppActionTypes {
  APP_OPEN_MODAL = '[App] Open modal',
  APP_CLOSE_MODAL = '[App] Close modal',
  APP_UPDATE_SELECTED_IMAGE_ID = '[App] Update selected image id',
  APP_UPDATE_SELECTED_IMAGE = '[App] Update selected image',
}

export const OpenModalAction = createAction(
  AppActionTypes.APP_OPEN_MODAL
);

export const CloseModalAction = createAction(
  AppActionTypes.APP_CLOSE_MODAL
);

export const UpdateModalSelectedImageIdAction = createAction(
  AppActionTypes.APP_UPDATE_SELECTED_IMAGE_ID,
  props<{ payload: number }>()
);

export const UpdateModalSelectedImageAction = createAction(
  AppActionTypes.APP_UPDATE_SELECTED_IMAGE,
  props<{ payload: IUpdateModalImage }>()
);

