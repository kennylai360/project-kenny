import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { AppFacade } from '../../../state-management/app/app.facade';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainerComponent implements OnInit, OnDestroy {

  public isModalOpen$: Observable<boolean>;

  private modalOpenSubscription: Subscription;

  constructor(private appFacade: AppFacade,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;

    this.modalOpenSubscription = this.isModalOpen$.subscribe((data: boolean) => {
      if (data) {
        this.renderer.addClass(document.body, 'noScroll');
      } else {
        this.renderer.removeClass(document.body, 'noScroll');
      }
    });

  }

  ngOnDestroy() {
    if (this.modalOpenSubscription) {
      this.modalOpenSubscription.unsubscribe();
    }
  }

  public overlayClose(): void {
    this.appFacade.closeModal();
  }
}
