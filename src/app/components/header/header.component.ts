import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastService } from '../../typescripts/pro/alerts/toast/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    const ua = window.navigator.userAgent;
    if (ua.indexOf('Trident/') > -1 ||
        ua.indexOf('Edge/') > -1) {
      this.toastService.info(
        'For an optimised browsing experience, please use an another browser.',
        'Internet Explorer detected',
        {
          timeOut: 0,
          extendedTimeOut: 5000
        });
    }
  }

}
