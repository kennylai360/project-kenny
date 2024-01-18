import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss',
})
export class ProfileContentComponent {
  @Input({ required: true })
  public fileContent: object;
}
