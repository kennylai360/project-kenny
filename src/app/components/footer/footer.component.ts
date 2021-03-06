import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  public currentYear: number = new Date().getFullYear();
  public version: string = environment.appVersion;

  constructor() { }

  ngOnInit() {
  }

}
