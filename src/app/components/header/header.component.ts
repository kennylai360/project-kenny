import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faCalculator,
  faCameraRetro,
  faFile,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class HeaderComponent {
  protected icons = {
    home: faHouseChimney,
    resume: faFile,
    photography: faCameraRetro,
    btcCalculator: faCalculator,
    twitter: faXTwitter,
    github: faGithub,
  };
}
