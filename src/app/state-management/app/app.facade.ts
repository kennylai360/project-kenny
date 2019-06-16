import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IndexState } from '../ngrx-index';
import { CloseModalAction, OpenModalAction, UpdateModalSelectedImageAction, UpdateModalSelectedImageIdAction } from './app.actions';
import { AppSelectors } from './app.selectors';



@Injectable()
export class AppFacade {
  public modalOpen$: Observable<boolean>;
  public selectedImageId$:  Observable<number>;
  public selectedImage$: Observable<string>;
  public selectedImageHorizontalOrientation$: Observable<boolean>;

  constructor(private store: Store<IndexState>) {
    this.modalOpen$ = this.store.pipe(select(AppSelectors.modalStatus));
    this.selectedImageId$ = this.store.pipe(select(AppSelectors.selectedImageId));
    this.selectedImage$ = this.store.pipe(select(AppSelectors.selectedImage));
    this.selectedImageHorizontalOrientation$ = this.store.pipe(select(AppSelectors.selectedImageHorizontalOrientation));
  }

  // Called once to load up the json file on initial load up.
  public openModal(): void {
    this.store.dispatch(new OpenModalAction());
  }

  public closeModal(): void {
    let modalValue: boolean = null;
    this.modalOpen$.pipe(take(1))
      .subscribe((data: boolean) => {
      modalValue = data;
    });
    if (modalValue) {
      this.store.dispatch(new CloseModalAction());
    }
  }

  public updateSelectedImageId(id: number):  void {
    this.store.dispatch(new UpdateModalSelectedImageIdAction(id));
  }

  public updateSelectedImage(url: string, id: number, orient: boolean):  void {
    this.store.dispatch(new UpdateModalSelectedImageAction(url, id, orient));
  }

}
