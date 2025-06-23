import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayContainerComponent } from '../../components/overlay/overlay-container/overlay-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        OverlayContainerComponent,
        FontAwesomeModule,
    ]
})
export class HomeComponent {
  public icons = {
    smiley: faSmileBeam,
  };
}
