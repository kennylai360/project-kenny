import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { AppFacade } from '../../../state-management/app/app.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallery-album',
  templateUrl: './gallery-album.component.html',
  styleUrls: ['./gallery-album.component.scss'],
})
export class GalleryAlbumComponent {
  public pageNumber: number = 1;

  public selectedImageId: number = null;

  private destroyRef: DestroyRef = inject(DestroyRef);

  private loadedImagesUrl: Array<string> = [];

  public albumData: Observable<IGalleryCover> = of({
    albumId: '',
    imgUrl: '',
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private galleryFacade: GalleryFacade,
    private appFacade: AppFacade
  ) {
    // load the album here which corresponds to the id. If it does not exist then redirect to album listing page
    // Debouncetime is added to give the loading and make sure the gallery data has been loaded into the store.
    // this is as a fallback in case the use enters the ID in directly to the address bar.
    this.activatedRoute.params
      .pipe(debounceTime(10), takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params) => {
        this.galleryFacade.setSelectedId(params['id']);
        this.galleryFacade.getAlbumDataById();
        this.albumData = this.galleryFacade.albumData$;
      });
  }

  public openModal(imageId: number, imageUrl: string, horizontal: boolean) {
    this.loadedImagesUrl.map((loadedImageUrl: string) => {
      if (loadedImageUrl === imageUrl) {
        this.appFacade.updateSelectedImage(imageUrl, imageId, horizontal);
        this.appFacade.openModal();
      }
    });
  }

  // Puts the Image Url inside an array which then can be used to check if the image has been loaded or not.
  // If the image has not been loaded inside the openModal method we will map through the array and handle it accordingly based off if the
  // imageUrl is found or not.
  public allowOpenModal(url: string): void {
    this.loadedImagesUrl.push(url);
  }
}
