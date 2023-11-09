import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { OverlayContainerComponent } from '../../components/overlay/overlay-container/overlay-container.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, OverlayContainerComponent],
})
export class HomeComponent {}
