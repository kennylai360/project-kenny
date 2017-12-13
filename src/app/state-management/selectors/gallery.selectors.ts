
import { IGalleryCover } from '../interface/gallery-cover.interface';
import { IndexState } from '../ngrx-index';
import { IGalleryState } from '../interface/gallery-state.interface';
import { createSelector, OutputSelector, Selector } from 'reselect';

const galleryState: Selector<IndexState, IGalleryState> =
  (state: IndexState) => {
    return state.gallery;
  };

export class GallerySelectors {

  public static galleryList: OutputSelector<IndexState, Array<IGalleryCover>, Function>
    = createSelector(galleryState, (exemptVehicleState: IGalleryState) => {
      return exemptVehicleState.galleryCoverData;
    }
  );

}
