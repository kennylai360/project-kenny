import { Component, OnInit } from '@angular/core';
import { CounterFacade } from '../../state-management/facade/counter-facade';

@Component({
  selector: 'pk-input-search',
  templateUrl: './pk-input-search.component.html',
  styleUrls: ['./pk-input-search.component.scss'],
})
export class PkInputSearchComponent implements OnInit {

  constructor(private counterFacade: CounterFacade) { }

  ngOnInit() {
  }

  public doSomething() {
    this.counterFacade.incrementCounter();
    console.log('harooo');
    return false;
  }

}
