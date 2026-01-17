
import { Component, input } from '@angular/core';
import { ProfileContent } from './profile-content.interface';

@Component({
    selector: 'app-profile-content',
    imports: [],
    templateUrl: './profile-content.component.html',
    styleUrl: './profile-content.component.scss'
})
export class ProfileContentComponent {
  public fileContent = input.required<Array<ProfileContent>>();
}
