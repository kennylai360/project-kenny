import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CounterFacade } from '../../state-management/counter/counter-facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private counterFacade:  CounterFacade) { }

  ngOnInit() {
  }

  public addOne() {
    this.counterFacade.incrementCounter();
  }

}
