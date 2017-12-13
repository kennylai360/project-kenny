import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IndexState } from '../ngrx-index';
import { Store } from '@ngrx/store';
import { GalleryLoadDataAction } from '../actions/gallery-actions';
import { IGalleryContent } from '../reducers/gallery-reducers';

@Injectable()
export class GalleryFacade {
  public galleryList$: Observable<IGalleryContent[]>;

  constructor(private store: Store<IndexState>) {
    this.galleryList$ = this.store.select((state: IndexState) => state.gallery.galleryList);
  }

  public loadGalleryList(): void {
    this.store.dispatch(new GalleryLoadDataAction());
  }
}
