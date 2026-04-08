import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  GalleryLoadDataSuccessAction,
  GalleryGetDataByIdSuccessAction,
  GalleryRedirectBackToAlbumListPageAction,
  GalleryLoadDataAction,
  GalleryGetDataByIdAction,
} from './gallery.actions';
import { IndexState } from '../ngrx-index';
import { IGalleryCover } from './gallery-cover.interface';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class GalleryEffects {
  static readonly galleryContentUrl: string =
    '../../assets/gallery-content.json';

  public getGalleryData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryLoadDataAction),
      switchMap(() => {
        return this.http.get(GalleryEffects.galleryContentUrl).pipe(
          map((res: IGalleryCover[]) => {
            return GalleryLoadDataSuccessAction({ payload: res });
          })
        );
      })
    )
  );

  // Debounced added to make sure the galleryData has been loaded before it tries to retrieve the album
  public getAlbumData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryGetDataByIdAction),
      withLatestFrom(this.store$),
      map(([, state]: [Action, IndexState]) => {
        const filteredData: IGalleryCover[] = state.gallery.galleryData.filter(
          (obj: IGalleryCover) => obj.albumId === state.gallery.selectedAlbumId
        );
        // if data exists load the data and stay on the page, else return to the album listings page
        if (filteredData.length !== 0) {
          return GalleryGetDataByIdSuccessAction({ payload: filteredData[0] });
        } else {
          return GalleryRedirectBackToAlbumListPageAction();
        }
      })
    )
  );

  public redirectBackToAlbumListingPage$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GalleryRedirectBackToAlbumListPageAction),
        tap(() => {
          this.router.navigate(['photography'], { relativeTo: this.route });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<IndexState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
