import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import {
  GALLERY_LOAD_DATA, GalleryLoadDataSuccessAction, GalleryLoadDataFailureAction,
  GALLERY_LOAD_DATA_BY_ID, GalleryGetDataByIdSuccessAction, GalleryRedirectBackToAlbumListPageAction,
  GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE
} from './gallery.actions';
import { IndexState } from '../ngrx-index';
import { IGalleryCover } from './gallery-cover.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class GalleryEffects {

  @Effect()
  public getGalleryData$: Observable<Action> = this.actions$
    .ofType(GALLERY_LOAD_DATA)
    .withLatestFrom(this.store$)
    .switchMap(() => {
      return this.http.get('../../assets/gallery-content.json')
        .map((res: IGalleryCover[]) => {
          return new GalleryLoadDataSuccessAction(res);
        });
    });

  // Debounced added to make sure the galleryData has been loaded before it tries to retrieve the album
  @Effect()
  public getAlbumData$: Observable<Action> = this.actions$
    .ofType(GALLERY_LOAD_DATA_BY_ID)
    .withLatestFrom(this.store$)
    .map(([action, state]: [Action, IndexState]) => {
      const filteredData: IGalleryCover[] = state.gallery.galleryData.filter(
        (obj: IGalleryCover) => +(obj.albumId) === +(state.gallery.selectedAlbumId)
      );
      // if data exists load the data and stay on the page, else return to the album listings page
      if (filteredData.length !== 0) {
        return new GalleryGetDataByIdSuccessAction(filteredData[0]);
      } else {
        return new GalleryRedirectBackToAlbumListPageAction();
      }
    });

  @Effect({dispatch: false})
  public redirectBackToAlbumListingPage$: Observable<void> = this.actions$
    .ofType(GALLERY_REDIRECT_BACK_TO_ALBUM_LIST_PAGE)
    .map(() => {
      this.router.navigate(['photography'], { relativeTo: this.route});
    });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<IndexState>,
              private router: Router,
              private route: ActivatedRoute
              // private store$: Store<IndexState>,
              // private actions$: Actions,
              // private routerActions: RouterActions,
              // private notificationService: NotificationsService,
              // private translateService: TranslateService,
              // private eligibilityService: EligibilityService,
              // private userFacade: CurrentUserFacade,
              // private operatorApiService: OperatorAPIService,
              // private toastrService: ToastrService
  ) {}
}
