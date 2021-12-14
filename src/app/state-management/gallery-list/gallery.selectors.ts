import { IndexState } from '../ngrx-index';
import { IGalleryState } from './gallery-state.interface';
import { createSelector, Selector } from 'reselect';

const galleryState: Selector<IndexState, IGalleryState> =
  (state: IndexState) => {
    return state.gallery;
  };

export class GallerySelectors {

  public static galleryList
    = createSelector(galleryState, (exemptVehicleState: IGalleryState) => {
      return exemptVehicleState.galleryData;
    }
  );

  public static selectedAlbum
    = createSelector(galleryState, (exemptVehicleState: IGalleryState) => {
      return exemptVehicleState.selectedAlbum;
    }
  );

}
