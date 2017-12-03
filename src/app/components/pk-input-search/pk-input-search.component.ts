import { Component, Input, OnInit, Output } from '@angular/core';
import { CounterFacade } from '../../state-management/facade/counter-facade';

@Component({
  selector: 'pk-input-search',
  templateUrl: './pk-input-search.component.html',
  styleUrls: ['./pk-input-search.component.scss'],
})
export class PkInputSearchComponent implements OnInit {

  @Input()
  public textFieldValue: String = 'bob';

  @Output()
  public textOutputValue: String;

  public str: string;

  constructor(private counterFacade: CounterFacade) { }

  ngOnInit() {
  }

  public textValueChange(e: string) {
    console.log(this.str);
  }

  public doSomething(name: string) {
    this.counterFacade.incrementCounter();
    console.log(name);
    return false;
  }

}
