import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IndexState } from '../ngrx-index';
import { CloseModalAction, OpenModalAction } from './app.actions';
import { AppSelectors } from './app.selectors';


@Injectable()
export class AppFacade {
  public modalOpen$: Observable<boolean>;

  constructor(private store: Store<IndexState>) {
    this.modalOpen$ = this.store.select(AppSelectors.modalStatus);
  }

  // Called once to load up the json file on initial load up.
  public openModal(): void {
    this.store.dispatch(new OpenModalAction());
  }

  public closeModal(): void {
    this.store.dispatch(new CloseModalAction());
  }

}
