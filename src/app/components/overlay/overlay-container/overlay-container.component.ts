import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AppFacade } from '../../../state-management/app/app.facade';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainerComponent implements OnInit {

  public isModalOpen$: Observable<boolean>;

  constructor(
    private appFacade: AppFacade
  ) {}

  ngOnInit() {
    this.isModalOpen$ = this.appFacade.modalOpen$;
  }

  public overlayClose(): void {
    this.appFacade.closeModal();
  }
}
