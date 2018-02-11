import {
  Component, EventEmitter, HostListener, Input, NgZone, OnDestroy, OnInit, Output, Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppFacade } from '../../../state-management/app/app.facade';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade';
import { IAlbumImagesData } from '../../../pages/galleries/gallery-album/album-data.interface';

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

  public imageWidth: number;

  public imageHeight: number;

  private modalOpenSubscription: Subscription;

  private modalSelectedImageIdSubscription: Subscription;

  private isModalOpenValue: boolean;

  @Input()
  public albumSet: Array<IGalleryCover>;

  @Input()
  public selectedImageId: Observable<number>;

  constructor(private appFacade: AppFacade,
              private renderer: Renderer2,
              private ngZone: NgZone) {

    window.onresize = (e) => {
      ngZone.run(() => {
        this.imageWidth = window.innerWidth;
        this.imageHeight = window.innerHeight;
      });
    };
  }

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;
    this.selectedImageUrl$ = this.appFacade.selectedImage$;
    this.selectedImageId$ = this.appFacade.selectedImageId$;
    this.selectedImageHorizontalOrientation$ = this.appFacade.selectedImageHorizontalOrientation$;

    // this.modalSelectedImageIdSubscription = this.appFacade.selectedImageId$.subscribe((data: number) => {
    // });

    this.modalOpenSubscription = this.isModalOpen$.subscribe((data: boolean) => {
      if (data) {
        this.renderer.addClass(document.body, 'noScroll');
        this.isModalOpenValue = true;
      } else {
        this.renderer.removeClass(document.body, 'noScroll');
        this.isModalOpenValue = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.modalOpenSubscription) {
      this.modalOpenSubscription.unsubscribe();
    }

    if (this.modalSelectedImageIdSubscription) {
      this.modalSelectedImageIdSubscription.unsubscribe();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private keyPress(event: KeyboardEvent): void {

    if (event.key === 'Escape' && this.isModalOpenValue) {
      this.appFacade.closeModal();

    }
  }

  public closeModal() {
    this.appFacade.closeModal();
    setTimeout(() => {
      this.appFacade.updateSelectedImage('', null, false);
      }, 500);

  }

  public leftArrowClick():  void {
  }

  public rightArrowClick(): void {

  }
}
