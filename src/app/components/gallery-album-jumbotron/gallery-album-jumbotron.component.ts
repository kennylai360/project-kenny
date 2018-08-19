import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ISocialMediaLinks } from '../../state-management/gallery-list/social-media-links.interface';

@Component({
  selector: 'app-gallery-album-jumbotron',
  templateUrl: './gallery-album-jumbotron.component.html',
  styleUrls: ['./gallery-album-jumbotron.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryAlbumJumbotronComponent implements OnInit {

  @Input()
  public albumTitle?: string;

  @Input()
  public albumSubtitle?: string;

  @Input()
  public albumCoverPicture?: string;

  @Input()
  public socialMediaLinks?: ISocialMediaLinks;

  constructor() {
  }

  ngOnInit() {
  }

}
