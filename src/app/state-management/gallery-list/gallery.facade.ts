import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IndexState } from '../ngrx-index';
import { Store } from '@ngrx/store';
import { GalleryLoadDataAction } from './gallery-actions';
import { IGalleryCover } from './gallery-cover.interface';
import { GallerySelectors } from './gallery.selectors';

@Injectable()
export class GalleryFacade {
  public galleryList$: Observable<IGalleryCover[]>;

  constructor(private store: Store<IndexState>) {
    this.galleryList$ = this.store.select(GallerySelectors.galleryList);
  }

  // Called once to load up the json file on initial load up.
  public loadGalleryList(): void {
    this.store.dispatch(new GalleryLoadDataAction());
  }
}
