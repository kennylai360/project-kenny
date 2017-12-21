import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IndexState } from '../ngrx-index';
import { Store } from '@ngrx/store';
import { GalleryGetDataByIdAction, GalleryLoadDataAction, GallerySetSelectedAlbumIdAction } from './gallery-actions';
import { IGalleryCover } from './gallery-cover.interface';
import { GallerySelectors } from './gallery.selectors';

@Injectable()
export class GalleryFacade {
  public galleryList$: Observable<IGalleryCover[]>;
  public albumData$: Observable<IGalleryCover>;

  constructor(private store: Store<IndexState>) {
    this.galleryList$ = this.store.select(GallerySelectors.galleryList);
    this.albumData$ = this.store.select(GallerySelectors.selectedAlbum);
  }

  // Called once to load up the json file on initial load up.
  public loadGalleryList(): void {
    this.store.dispatch(new GalleryLoadDataAction());
  }

  public getAlbumDataById(): void {
    this.store.dispatch(new GalleryGetDataByIdAction());
  }

  public setSelectedId(idValue: number): void {
    this.store.dispatch(new GallerySetSelectedAlbumIdAction(idValue));
  }

}
