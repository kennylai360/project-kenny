import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: []
})
export class FooterComponent {
  public version: string = environment.appVersion;
}
