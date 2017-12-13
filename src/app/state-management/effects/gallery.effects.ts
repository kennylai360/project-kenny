import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import { GALLERY_LOAD_DATA, GalleryLoadDataSuccessAction, GalleryLoadDataFailureAction } from '../actions/gallery-actions';
import { IndexState } from '../ngrx-index';
import { IGalleryCover } from '../interface/gallery-cover.interface';

@Injectable()
export class GalleryEffects {

  @Effect()
  public getGalleryData$: Observable<Action> = this.actions$
    .ofType(GALLERY_LOAD_DATA)
    .withLatestFrom(this.store$)
    .switchMap(([action, state]: [Action, IndexState]) => {
      return this.http.get('../../assets/cover-content.json')
        .map((res: IGalleryCover[]) => {
          return new GalleryLoadDataSuccessAction(res);
        });
    })

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<IndexState>
              // private router: Router,
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
