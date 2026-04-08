import { Injectable, inject } from '@angular/core'
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
  private store = inject(Store<IndexState>)

  public modalOpen$: Observable<boolean> = this.store.select(AppSelectors.modalStatus)
  public selectedImageId$: Observable<number> = this.store.select(AppSelectors.selectedImageId)
  public selectedImage$: Observable<string> = this.store.select(AppSelectors.selectedImage)
  public selectedImageHorizontalOrientation$: Observable<boolean> = this.store.select(
    AppSelectors.selectedImageHorizontalOrientation
  )

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
