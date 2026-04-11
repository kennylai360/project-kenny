import {
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { AppFacade } from '../../../state-management/app/app.facade';
import { IAlbumImagesData } from '../../../pages/galleries/gallery-album/album-data.interface';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-overlay-container',
    templateUrl: './overlay-container.component.html',
    styleUrl: './overlay-container.component.scss',
    imports: [AsyncPipe, NgClass, NgOptimizedImage, RouterModule, FontAwesomeModule],
    animations: [
      trigger('slideAnimation', [
        transition(':increment', [
          style({ opacity: 0, transform: 'translate(calc(-50% + 80px), -50%)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'translate(-50%, -50%)' })),
        ]),
        transition(':decrement', [
          style({ opacity: 0, transform: 'translate(calc(-50% - 80px), -50%)' }),
          animate('300ms ease-out', style({ opacity: 1, transform: 'translate(-50%, -50%)' })),
        ]),
      ]),
    ],
})
export class OverlayContainerComponent implements OnInit {
  private appFacade = inject(AppFacade);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);

  public isModalOpen$: Observable<boolean>;

  public selectedImageUrl$: Observable<string>;

  public selectedImageId$: Observable<number>;

  public selectedImageHorizontalOrientation$: Observable<boolean>;

  private isModalOpenValue: boolean;
  protected currentIndex: number = -1;
  private touchStartX: number = 0;

  protected icons = {
    closeModalButton: faXmark,
    leftArrow: faArrowLeft,
    rightArrow: faArrowRight,
  };

  public albumSet = input.required<Array<IAlbumImagesData>>();

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;
    this.selectedImageUrl$ = this.appFacade.selectedImage$;
    this.selectedImageId$ = this.appFacade.selectedImageId$;
    this.selectedImageHorizontalOrientation$ =
      this.appFacade.selectedImageHorizontalOrientation$;

    this.isModalOpen$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isModalOpen: boolean) => {
        isModalOpen
          ? this.renderer.addClass(document.body, 'noScroll')
          : this.renderer.removeClass(document.body, 'noScroll');
        this.isModalOpenValue = isModalOpen;
      });

    this.selectedImageId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id: number) => {
        const images = this.albumSet();
        this.currentIndex = images?.length
          ? images.findIndex((img) => img.imageId === id)
          : -1;
      });
  }

  @HostListener('document:keydown', ['$event'])
  protected keyPress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isModalOpenValue) {
      this.appFacade.closeModal();
    }

    if (event.key === 'ArrowLeft' && this.isModalOpenValue) {
      this.navigateImage(-1);
    }

    if (event.key === 'ArrowRight' && this.isModalOpenValue) {
      this.navigateImage(1);
    }
  }

  @HostListener('document:touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent): void {
    if (this.isModalOpenValue) {
      this.touchStartX = event.touches[0].clientX;
    }
  }

  @HostListener('document:touchend', ['$event'])
  protected onTouchEnd(event: TouchEvent): void {
    if (!this.isModalOpenValue) return;

    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) < minSwipeDistance) return;

    // Swipe left → next image, swipe right → previous image
    this.navigateImage(deltaX < 0 ? 1 : -1);
  }

  public navigateImage(direction: -1 | 1): void {
    const images = this.albumSet();
    if (this.currentIndex === -1 || !images?.length) return;

    const nextIndex = this.currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;

    const nextImage = images[nextIndex];
    this.appFacade.updateSelectedImage(
      nextImage.imgUrl,
      nextImage.imageId,
      nextImage.horizontalOrient
    );
  }

  public closeModal() {
    this.appFacade.closeModal();
  }
}
