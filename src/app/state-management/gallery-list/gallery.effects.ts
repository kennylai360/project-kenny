import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GALLERY_LOAD_DATA, GalleryLoadDataSuccessAction,
  GALLERY_LOAD_DATA_BY_ID, GalleryGetDataByIdSuccessAction, GalleryRedirectBackToAlbumListPageAction,
  GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE
} from './gallery.actions';
import { IndexState } from '../ngrx-index';
import { IGalleryCover } from './gallery-cover.interface';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';


@Injectable()
export class GalleryEffects {

  @Effect()
  public getGalleryData$: Observable<Action> = this.actions$.pipe(
    ofType(GALLERY_LOAD_DATA),
    withLatestFrom(this.store$),
    switchMap(() => {
      return this.http.get('../../assets/gallery-content.json').pipe(
        map((res: IGalleryCover[]) => {
          return new GalleryLoadDataSuccessAction(res);
        }));
    }));

  // Debounced added to make sure the galleryData has been loaded before it tries to retrieve the album
  @Effect()
  public getAlbumData$: Observable<Action> = this.actions$.pipe(
    ofType(GALLERY_LOAD_DATA_BY_ID),
    withLatestFrom(this.store$),
    map(([action, state]: [Action, IndexState]) => {
      const filteredData: IGalleryCover[] = state.gallery.galleryData.filter(
        (obj: IGalleryCover) => (obj.albumId) === (state.gallery.selectedAlbumId)
      );
      // if data exists load the data and stay on the page, else return to the album listings page
      if (filteredData.length !== 0) {
        // sort the images in decending order, essentially emulating the latest images go first.
        const sortedImages = filteredData[0].albumImages;
        sortedImages.sort(function (a, b) {
          return (a.imageId < b.imageId) ? 1 : ((b.imageId < a.imageId) ? -1 : 0);
        });
        return new GalleryGetDataByIdSuccessAction(filteredData[0]);
      } else {
        return new GalleryRedirectBackToAlbumListPageAction();
      }
    }));

  @Effect({dispatch: false})
  public redirectBackToAlbumListingPage$: Observable<Action> = this.actions$.pipe(
    ofType(GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE),
    tap(() => {
      this.router.navigate(['photography'], {relativeTo: this.route});
    }));

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store$: Store<IndexState>,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }
}
