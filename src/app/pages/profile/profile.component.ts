import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileContentComponent } from '../../components/profile-content/profile-content.component';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ProfileContentComponent],
})
export class ProfileComponent implements OnInit {
  private dateOfBirth: Date = new Date(Date.UTC(1993, 9, 26));

  public dateOfBirthDisplay: string;

  public currentAge: number;

  public profileContent: Observable<object> =
    this.profileService.loadProfileContent();

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    const timeDiff = Math.abs(Date.now() - Number(this.dateOfBirth));
    this.currentAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);

    this.dateOfBirthDisplay = this.dateOfBirth.toLocaleDateString('en-GB');
  }
}
