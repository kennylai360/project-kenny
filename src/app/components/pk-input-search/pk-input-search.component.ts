import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pk-input-search',
  templateUrl: './pk-input-search.component.html',
  styleUrls: ['./pk-input-search.component.scss'],
})
export class PkInputSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public doSomething() {
    console.log('harooo');
    return false;
  }

}
