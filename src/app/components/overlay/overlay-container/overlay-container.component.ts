import { Component, HostListener, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppFacade } from '../../../state-management/app/app.facade';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainerComponent implements OnInit, OnDestroy {

  public isModalOpen$: Observable<boolean>;

  private modalOpenSubscription: Subscription;

  private isModalOpenValue: boolean;

  constructor(private appFacade: AppFacade,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;

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
  }

  @HostListener('document:keydown', ['$event'])
  private keyPress(event: KeyboardEvent): void {

    if (event.key === 'Escape' && this.isModalOpenValue) {
      this.appFacade.closeModal();
    }
  }

  public closeModal() {
    this.appFacade.closeModal();
  }
}
