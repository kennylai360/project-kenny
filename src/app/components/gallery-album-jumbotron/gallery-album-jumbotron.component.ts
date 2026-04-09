import { Component, input } from '@angular/core';
import { ISocialMediaLinks } from '../../state-management/gallery-list/social-media-links.interface';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWeibo,
} from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-gallery-album-jumbotron',
    templateUrl: './gallery-album-jumbotron.component.html',
    styleUrl: './gallery-album-jumbotron.component.scss',
    imports: [LazyLoadImageModule, FontAwesomeModule]
})
export class GalleryAlbumJumbotronComponent {
  public albumTitle = input<string>();
  public albumSubtitle = input<string>();
  public albumCoverPicture = input<string>();
  public socialMediaLinks = input<ISocialMediaLinks>();

  public icons = {
    instagram: faInstagram,
    facebook: faFacebook,
    twitter: faTwitter,
    weibo: faWeibo,
  };
}
