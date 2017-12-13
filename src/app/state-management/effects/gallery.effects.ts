import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import { GALLERY_LOAD_DATA, GalleryLoadDataActionSuccess } from '../actions/gallery-actions';
import { HttpClient } from '@angular/common/http';
import { IndexState } from '../ngrx-index';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class GalleryEffects {

  @Effect()
  public getGalleryData$: Observable<Action> = this.actions$
    .ofType(GALLERY_LOAD_DATA)
    .withLatestFrom(this.store$)
    .switchMap(([action, state]: [Action, IndexState]) => {
      return this.http.get('../../assets/cover-content.json')
        .map((res: any) => {
        console.log(res);
          return new GalleryLoadDataActionSuccess(res);
        });
    });

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
