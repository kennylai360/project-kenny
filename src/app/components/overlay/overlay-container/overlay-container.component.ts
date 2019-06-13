import {
  Component, HostListener, Input, OnDestroy, OnInit, Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AppFacade } from '../../../state-management/app/app.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainerComponent implements OnInit, OnDestroy {

  public isModalOpen$: Observable<boolean>;

  public selectedImageUrl$: Observable<string>;

  public selectedImageId$: Observable<number>;

  public selectedImageHorizontalOrientation$: Observable<boolean>;

  private modalOpenSubscription: Subscription;

  private modalSelectedImageIdSubscription: Subscription;

  private currentPictureHorizontalOrientationSub: Subscription;

  private isModalOpenValue: boolean;

  private currentPictureHorizontalOrientation: boolean;

  @Input()
  public albumSet: Array<IGalleryCover>;

  @Input()
  public selectedImageId: Observable<number>;

  constructor(private appFacade: AppFacade,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;
    this.selectedImageUrl$ = this.appFacade.selectedImage$;
    this.selectedImageId$ = this.appFacade.selectedImageId$;
    this.selectedImageHorizontalOrientation$ = this.appFacade.selectedImageHorizontalOrientation$;

    this.modalOpenSubscription = this.isModalOpen$.subscribe((data: boolean) => {
      if (data) {
        this.renderer.addClass(document.body, 'noScroll');
        this.isModalOpenValue = true;
      } else {
        this.renderer.removeClass(document.body, 'noScroll');
        this.isModalOpenValue = false;
      }
    });

    this.currentPictureHorizontalOrientationSub = this.selectedImageHorizontalOrientation$.subscribe((data: boolean) => {
      this.currentPictureHorizontalOrientation = data;
    });
  }

  ngOnDestroy() {
    if (this.modalOpenSubscription) {
      this.modalOpenSubscription.unsubscribe();
    }

    if (this.modalSelectedImageIdSubscription) {
      this.modalSelectedImageIdSubscription.unsubscribe();
    }

    if (this.currentPictureHorizontalOrientationSub) {
      this.currentPictureHorizontalOrientationSub.unsubscribe();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private keyPress(event: KeyboardEvent): void {

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
    setTimeout(() => {
      this.appFacade.updateSelectedImage('', null, this.currentPictureHorizontalOrientation);
      }, 500);

  }
}
