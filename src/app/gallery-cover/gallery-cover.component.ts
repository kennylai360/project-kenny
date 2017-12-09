import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gallery-cover',
  templateUrl: './gallery-cover.component.html',
  styleUrls: ['./gallery-cover.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryCoverComponent implements OnInit {

  @Input()
  public imgUrl: string;

  @Input()
  public coverTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
