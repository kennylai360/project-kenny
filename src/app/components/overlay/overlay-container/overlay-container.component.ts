import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverlayContainerComponent implements OnInit {

  @Input()
  public loadOverlay: boolean = false;

  @Output()
  public overlayClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public overlayClose(): void {
    this.overlayClicked.emit(false);
  }
}
