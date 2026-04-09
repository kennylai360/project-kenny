import {
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AppFacade } from '../../../state-management/app/app.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-overlay-container',
    templateUrl: './overlay-container.component.html',
    styleUrl: './overlay-container.component.scss',
    imports: [CommonModule, RouterModule, NgOptimizedImage, FontAwesomeModule]
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

  protected icons = {
    closeModalButton: faXmark,
  };

  public albumSet = input.required<Array<IGalleryCover>>();
  public selectedImageId = input.required<Observable<number>>();

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
  }

  @HostListener('document:keydown', ['$event'])
  protected keyPress(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isModalOpenValue) {
      this.appFacade.closeModal();
    }

    if (event.key === 'ArrowLeft' && this.isModalOpenValue) {
      // console.log('Left button pressed');
      // this.appFacade.updateSelectedImage('https://farm2.staticflickr.com/1964/44319436194_e6435002f1_k.jpg', 15, false);
    }

    if (event.key === 'ArrowRight' && this.isModalOpenValue) {
      // console.log('Right button pressed');
      // this.appFacade.updateSelectedImage('https://farm2.staticflickr.com/1932/44990793922_7754015d02_k.jpg', 13, false);
    }
  }

  public closeModal() {
    this.appFacade.closeModal();
  }
}
