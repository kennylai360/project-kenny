import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProfileContentComponent } from '../../components/profile-content/profile-content.component';
import { ProfileService } from '../../services/profile.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ProfileContentComponent],
})
export class ProfileComponent implements OnInit {
  private readonly dateOfBirth: Date = new Date(Date.UTC(1993, 9, 26));

  public dateOfBirthDisplay: string;

  public currentAge: number;

  public profileContent: object;

  public isContentLoaded = signal(false);

  public pictureLoaded = signal(false);

  constructor(private profileService: ProfileService) {
    this.profileService
      .loadProfileContent()
      .pipe(take(1))
      .subscribe((value) => {
        this.profileContent = value;
        this.isContentLoaded.set(true);
      });
  }

  ngOnInit() {
    const timeDiff = Math.abs(Date.now() - Number(this.dateOfBirth));
    this.currentAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);

    this.dateOfBirthDisplay = this.dateOfBirth.toLocaleDateString('en-GB');
  }

  isPictureLoaded() {
    this.pictureLoaded.set(true);
  }
}
