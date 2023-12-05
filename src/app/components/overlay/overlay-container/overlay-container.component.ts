import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppFacade } from '../../../state-management/app/app.facade';
import { IGalleryCover } from '../../../state-management/gallery-list/gallery-cover.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
})
export class OverlayContainerComponent implements OnInit, OnDestroy {
  public isModalOpen$: Observable<boolean>;

  public selectedImageUrl$: Observable<string>;

  public selectedImageId$: Observable<number>;

  public selectedImageHorizontalOrientation$: Observable<boolean>;

  private isModalOpenValue: boolean;

  private destory$: Subject<void> = new Subject<void>();

  @Input()
  public albumSet: Array<IGalleryCover>;

  @Input()
  public selectedImageId: Observable<number>;

  constructor(private appFacade: AppFacade, private renderer: Renderer2) {}

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;
    this.selectedImageUrl$ = this.appFacade.selectedImage$;
    this.selectedImageId$ = this.appFacade.selectedImageId$;
    this.selectedImageHorizontalOrientation$ =
      this.appFacade.selectedImageHorizontalOrientation$;

    this.isModalOpen$
      .pipe(takeUntil(this.destory$))
      .subscribe((isModalOpen: boolean) => {
        isModalOpen
          ? this.renderer.addClass(document.body, 'noScroll')
          : this.renderer.removeClass(document.body, 'noScroll');
        this.isModalOpenValue = isModalOpen;
      });
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
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
  }
}
