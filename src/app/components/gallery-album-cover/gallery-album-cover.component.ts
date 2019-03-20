import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gallery-album-cover',
  templateUrl: './gallery-album-cover.component.html',
  styleUrls: ['./gallery-album-cover.component.scss'],
})
export class GalleryAlbumCoverComponent {

  @Input()
  public imgUrl: string;

  @Input()
  public albumTitle: string = null;

  @Input()
  public translateX: number = 0;

  @Input()
  public translateY: number = 0;

  public scaleValue:  number = 1.0;

  public opacityValue: number = 0;

  constructor() {}

  public increaseScalingValue() {
    this.scaleValue = 1.2;
    this.opacityValue = 1;
  }

  public revertScalingValue() {
    this.scaleValue = 1.0;
    this.opacityValue = 0;
  }

}
