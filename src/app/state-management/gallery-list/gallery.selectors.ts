import { IndexState } from '../ngrx-index';
import { IGalleryState } from './gallery-state.interface';
import { createSelector } from '@ngrx/store';

const galleryState = (state: IndexState) => state.gallery;

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
