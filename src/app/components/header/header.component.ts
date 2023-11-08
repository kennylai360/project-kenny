import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
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
