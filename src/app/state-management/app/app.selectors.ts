import { IndexState } from '../ngrx-index';
import { createSelector, OutputSelector, Selector } from 'reselect';
import { IAppState } from './app-state.interface';

const appState: Selector<IndexState, IAppState> =
  (state: IndexState) => {
    return state.app;
  };

export class AppSelectors {

  public static modalStatus: OutputSelector<IndexState, boolean, Function>
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.hasModalOpen;
    }
  );

  public static selectedImage: OutputSelector<IndexState, string, Function>
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.selectedImage;
    }
  );

  public static selectedImageId: OutputSelector<IndexState, number, Function>
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.selectedImageId;
    }
  );

  public static selectedImageHorizontalOrientation: OutputSelector<IndexState, boolean, Function>
    = createSelector(appState, (applicationState: IAppState) => {
      return applicationState.selectedImageHorizontalOrient;
    }
  );

}
