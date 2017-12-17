
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IndexState } from '../ngrx-index';
import { Store } from '@ngrx/store';
import { EventFromEffectAction, IncrementAction } from './counter-actions';

@Injectable()
export class CounterFacade {
  public counterValue$: Observable<number>;

  constructor(private store: Store<IndexState>) {
    this.counterValue$ = this.store.select((state: IndexState) => state.counter.counterValue);
  }


  public incrementCounter(): void {
    this.store.dispatch(new IncrementAction());
  }

  public doSomethingEvent(): void {
    this.store.dispatch(new EventFromEffectAction());
  }
}
