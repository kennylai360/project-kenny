import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public loadOverlay: boolean = false;

  public something: boolean;

  constructor() { }

  ngOnInit() {
  }

  public openOverlay() {
    this.loadOverlay = true;
  }

  public changeOverlayValue(e: boolean): void {
    this.loadOverlay = e;
  }

}
