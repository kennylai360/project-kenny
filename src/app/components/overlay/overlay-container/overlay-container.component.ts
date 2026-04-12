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
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-overlay-container',
    templateUrl: './overlay-container.component.html',
    styleUrl: './overlay-container.component.scss',
    imports: [AsyncPipe, NgClass, RouterModule, FontAwesomeModule],
    animations: [
      trigger('slideAnimation', [
        transition('void => *', [
          style({ opacity: 0, transform: 'translate(-50%, -50%)' }),
          animate('200ms ease-out', style({ opacity: 1, transform: 'translate(-50%, -50%)' })),
        ]),
        transition(':increment', [
          animate('100ms ease-in', style({ opacity: 0 })),
          style({ transform: 'translate(calc(-50% + 80px), -50%)' }),
          animate('200ms ease-out', style({ opacity: 1, transform: 'translate(-50%, -50%)' })),
        ]),
        transition(':decrement', [
          animate('100ms ease-in', style({ opacity: 0 })),
          style({ transform: 'translate(calc(-50% - 80px), -50%)' }),
          animate('200ms ease-out', style({ opacity: 1, transform: 'translate(-50%, -50%)' })),
        ]),
      ]),
    ],
})
export class OverlayContainerComponent implements OnInit {
  private appFacade = inject(AppFacade);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);

  public isModalOpen$: Observable<boolean>;

  private isModalOpenValue: boolean;
  protected currentIndex: number = -1;
  protected displayImageUrl: string = '';
  protected displayHorizontalOrientation: boolean = false;
  private touchStartX: number = 0;

  protected icons = {
    closeModalButton: faXmark,
    leftArrow: faArrowLeft,
    rightArrow: faArrowRight,
  };

  public albumSet = input.required<Array<IAlbumImagesData>>();

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;

    this.isModalOpen$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isModalOpen: boolean) => {
        isModalOpen
          ? this.renderer.addClass(document.body, 'noScroll')
          : this.renderer.removeClass(document.body, 'noScroll');
        this.isModalOpenValue = isModalOpen;
      });

    // Handles initial image open from thumbnail click
    this.appFacade.selectedImageId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id: number) => {
        const images = this.albumSet();
        if (!images?.length) {
          this.currentIndex = -1;
          return;
        }
        const index = images.findIndex((img) => img.imageId === id);
        if (index === -1 || index === this.currentIndex) return;
        this.currentIndex = index;
        this.displayImageUrl = images[index].imgUrl;
        this.displayHorizontalOrientation = images[index].horizontalOrient;
      });
  }

  @HostListener('document:keydown', ['$event'])
  protected keyPress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isModalOpenValue) {
      this.closeModal();
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

    // Update local state synchronously so the animation and image
    // change happen in the same change detection cycle — no flash.
    this.currentIndex = nextIndex;
    this.displayImageUrl = nextImage.imgUrl;
    this.displayHorizontalOrientation = nextImage.horizontalOrient;

    // Keep store in sync for other consumers
    this.appFacade.updateSelectedImage(
      nextImage.imgUrl,
      nextImage.imageId,
      nextImage.horizontalOrient
    );
  }

  public closeModal() {
    this.appFacade.closeModal();
    this.displayImageUrl = '';
    this.currentIndex = -1;
  }
}
