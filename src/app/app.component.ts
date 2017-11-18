import { Component } from '@angular/core';
import { MainState } from './state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public counterValue$:  Observable<number>;

  title = 'app';

  constructor(private store:  Store<MainState>) {
    this.counterValue$ = this.store.select((state:  MainState) => state.counter);
  }

}


