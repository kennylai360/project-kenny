import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProfileContent } from './profile-content.interface';

@Component({
  selector: 'app-profile-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-content.component.html',
  styleUrl: './profile-content.component.scss',
})
export class ProfileContentComponent {
  public fileContent = input.required<Array<ProfileContent>>();
}
