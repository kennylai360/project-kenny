
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBomb,
  faCalculator,
  faCameraRetro,
  faCat,
  faFile,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [RouterModule, FontAwesomeModule]
})
export class HeaderComponent {
  protected icons = {
    home: faHouseChimney,
    resume: faFile,
    photography: faCameraRetro,
    btcCalculator: faCalculator,
    copyCatMocking: faCat,
    bombGame: faBomb,
    twitter: faXTwitter,
    github: faGithub,
  };
}
