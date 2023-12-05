import { Component, Input } from '@angular/core'
import { ISocialMediaLinks } from '../../state-management/gallery-list/social-media-links.interface'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { LazyLoadImageModule } from 'ng-lazyload-image'

@Component({
  selector: 'app-gallery-album-jumbotron',
  templateUrl: './gallery-album-jumbotron.component.html',
  styleUrls: ['./gallery-album-jumbotron.component.scss'],
  standalone: true,
  imports: [CommonModule, BrowserModule, LazyLoadImageModule],
})
export class GalleryAlbumJumbotronComponent {
  @Input()
  public albumTitle?: string

  @Input()
  public albumSubtitle?: string

  @Input()
  public albumCoverPicture?: string

  @Input()
  public socialMediaLinks?: ISocialMediaLinks
}
