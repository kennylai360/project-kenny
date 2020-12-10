import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const ua = window.navigator.userAgent;
    if (ua.indexOf('Trident/') > -1 ||
      ua.indexOf('Edge/') > -1 ||
      ua.indexOf('MSIE ') > -1) {
      // console.log(ua);
    }
  }

}
