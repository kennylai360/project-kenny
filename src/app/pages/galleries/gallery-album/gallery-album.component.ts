import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { AppFacade } from '../../../state-management/app/app.facade';


@Component({
  selector: 'app-gallery-album',
  templateUrl: './gallery-album.component.html',
  styleUrls: ['./gallery-album.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryAlbumComponent implements OnInit, OnDestroy {

  public selectedImageId: number = null;

  private routeSubscription: Subscription;

  public albumData: Observable<IGalleryCover> = Observable.of({
    albumId: null,
    imgUrl: null
  });

  constructor(private activatedRoute: ActivatedRoute,
              private galleryFacade: GalleryFacade,
              private appFacade: AppFacade
  ) {}

  ngOnInit() {
    // load the album here which corresponds to the id. If it does not exist then redirect to album listing page
    // Debouncetime is added to give the loading and make sure the gallery data has been loaded into the store.
    // this is as a fallback in case the use enters the ID in directly to the address bar.
    this.routeSubscription = this.activatedRoute.params.debounceTime(10).subscribe((params: Params) => {
      this.galleryFacade.setSelectedId(params['id']);
      this.galleryFacade.getAlbumDataById();
      this.albumData = this.galleryFacade.albumData$;
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  public openModal(imageId: number, imageUrl: string, horizontal: boolean) {
    // this.appFacade.updateSelectedImageId(imageId);
    this.appFacade.updateSelectedImage(imageUrl, imageId, horizontal);
    this.appFacade.openModal();
  }

}
