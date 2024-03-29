import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  GalleryGetDataByIdAction,
  GalleryLoadDataAction,
  GallerySetSelectedAlbumIdAction,
} from './gallery.actions'
import { GallerySelectors } from './gallery.selectors'
import { IGalleryCover } from './gallery-cover.interface'
import { IndexState } from '../ngrx-index'

@Injectable()
export class GalleryFacade {
  public galleryList$: Observable<IGalleryCover[]>
  public albumData$: Observable<IGalleryCover>

  constructor(private store: Store<IndexState>) {
    this.galleryList$ = this.store.select(GallerySelectors.galleryList)
    this.albumData$ = this.store.select(GallerySelectors.selectedAlbum)
  }

  // Called once to load up the json file on initial load up.
  public loadGalleryList(): void {
    this.store.dispatch(GalleryLoadDataAction())
  }

  public getAlbumDataById(): void {
    this.store.dispatch(GalleryGetDataByIdAction())
  }

  public setSelectedId(idValue: string): void {
    this.store.dispatch(GallerySetSelectedAlbumIdAction({ payload: idValue }))
  }
}
