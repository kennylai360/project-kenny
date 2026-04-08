import { Component, OnInit, inject } from '@angular/core';
import { PlatformLocation, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { AppFacade } from '../../../state-management/app/app.facade';
import { RouterLink } from '@angular/router';
import { GalleryAlbumCoverComponent } from '../../../components/gallery-album-cover/gallery-album-cover.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-galleries',
    templateUrl: './gallery-album-listing.component.html',
    styleUrls: ['./gallery-album-listing.component.scss'],
    imports: [
        NgxPaginationModule,
        GalleryAlbumCoverComponent,
        RouterLink,
        AsyncPipe,
    ]
})
export class GalleryAlbumListingComponent implements OnInit {
  private galleryFacade = inject(GalleryFacade);
  private appFacade = inject(AppFacade);
  private location = inject(PlatformLocation);

  public coverContent: Observable<IGalleryCover[]>;

  public currentSelectedPage: number = 1;

  public ngOnInit(): void {
    this.coverContent = this.galleryFacade.galleryList$;

    this.location.onPopState(() => {
      this.appFacade.closeModal();
    });
  }
}
