import { IndexState } from '../ngrx-index';
import { createSelector, OutputSelector, Selector } from 'reselect';
import { IAppState } from './app-state.interface';

const appState: Selector<IndexState, IAppState> =
  (state: IndexState) => {
    return state.app;
  };

export class AppSelectors {

  public static modalStatus
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.hasModalOpen;
    }
  );

  public static selectedImage
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.selectedImage;
    }
  );

  public static selectedImageId
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.selectedImageId;
    }
  );

  public static selectedImageHorizontalOrientation
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.selectedImageHorizontalOrient;
    }
  );

}
