import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  OnInit,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ProfileContentComponent } from '../../components/profile-content/profile-content.component';
import { ProfileService } from '../../api/profile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBriefcase, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [
        CommonModule,
        NgOptimizedImage,
        ProfileContentComponent,
        FontAwesomeModule,
    ],
    providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  private readonly dateOfBirth: Date = new Date(Date.UTC(1993, 9, 26));

  private profileService = inject(ProfileService);

  protected icons = {
    briefcase: faBriefcase,
    globe: faGlobe,
  };

  public dateOfBirthDisplay: string;

  public currentAge: number;

  public profileContent: Signal<object> = toSignal(
    this.profileService.loadProfileContent()
  );

  public isContentLoaded: Signal<boolean> = computed(() => {
    return this.profileContent() ? true : false;
  });

  public pictureLoaded = signal(false);

  ngOnInit() {
    const timeDiff = Math.abs(Date.now() - Number(this.dateOfBirth));
    this.currentAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);

    this.dateOfBirthDisplay = this.dateOfBirth.toLocaleDateString('en-GB');
  }
}
