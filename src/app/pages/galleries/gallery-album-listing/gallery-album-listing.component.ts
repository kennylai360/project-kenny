import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';

@Component({
  selector: 'app-galleries',
  templateUrl: './gallery-album-listing.component.html',
  styleUrls: ['./gallery-album-listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryAlbumListingComponent implements OnInit {

  public coverContent: Observable<IGalleryCover[]>;

  public currentSelectedPage: number = 1;

  constructor(
    private galleryFacade:  GalleryFacade
  ) {}

  public ngOnInit(): void {
    this.coverContent = this.galleryFacade.galleryList$;
  }
}
