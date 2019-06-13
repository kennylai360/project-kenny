import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { AppFacade } from '../../../state-management/app/app.facade';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-galleries',
  templateUrl: './gallery-album-listing.component.html',
  styleUrls: ['./gallery-album-listing.component.scss'],
})

export class GalleryAlbumListingComponent implements OnInit {

  public coverContent: Observable<IGalleryCover[]>;

  public currentSelectedPage: number = 1;

  constructor(
    private galleryFacade:  GalleryFacade,
    private appFacade: AppFacade,
    private location: PlatformLocation
  ) {}

  public ngOnInit(): void {
    this.coverContent = this.galleryFacade.galleryList$;

   this.location.onPopState(() => {
     this.appFacade.closeModal();
   });
  }
}
