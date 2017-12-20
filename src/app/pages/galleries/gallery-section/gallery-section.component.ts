import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-gallery-section',
  templateUrl: './gallery-section.component.html',
  styleUrls: ['./gallery-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GallerySectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
