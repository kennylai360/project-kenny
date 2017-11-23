import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CounterFacade } from './state-management/facade/counter-facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public counterValue$:  Observable<number>;

  constructor(private counterFacade: CounterFacade) {
    this.counterValue$ = this.counterFacade.counterValue$;
  }

}


