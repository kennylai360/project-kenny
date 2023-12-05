import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IndexState } from '../ngrx-index'
import {
  CloseModalAction,
  OpenModalAction,
  UpdateModalSelectedImageAction,
  UpdateModalSelectedImageIdAction,
} from './app.actions'
import { AppSelectors } from './app.selectors'

@Injectable()
export class AppFacade {
  public modalOpen$: Observable<boolean>
  public selectedImageId$: Observable<number>
  public selectedImage$: Observable<string>
  public selectedImageHorizontalOrientation$: Observable<boolean>

  constructor(private store: Store<IndexState>) {
    this.modalOpen$ = this.store.select(AppSelectors.modalStatus)
    this.selectedImageId$ = this.store.select(AppSelectors.selectedImageId)
    this.selectedImage$ = this.store.select(AppSelectors.selectedImage)
    this.selectedImageHorizontalOrientation$ = this.store.select(
      AppSelectors.selectedImageHorizontalOrientation
    )
  }

  // Called once to load up the json file on initial load up.
  public openModal(): void {
    this.store.dispatch(OpenModalAction())
  }

  public closeModal(): void {
    this.store.dispatch(CloseModalAction())
  }

  public updateSelectedImageId(id: number): void {
    this.store.dispatch(UpdateModalSelectedImageIdAction({ payload: id }))
  }

  public updateSelectedImage(url: string, id: number, orient: boolean): void {
    this.store.dispatch(
      UpdateModalSelectedImageAction({
        payload: { imageUrl: url, imageId: id, imageHorizontalOrient: orient },
      })
    )
  }
}
