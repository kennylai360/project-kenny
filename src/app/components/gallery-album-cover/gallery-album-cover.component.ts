import { Component, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  public scaleValue: number = 1.0;

  public opacityValue: number = 0;

  public imageHasLoaded: boolean = false;

  constructor(private deviceType: DeviceDetectorService) {}

  // Function should only really call when it is in desktop mode for hovering over the album cover,
  // and same before the function below.
  public increaseScalingValue() {
    if (this.deviceType.isDesktop()) {
      this.scaleValue = 1.2;
      this.opacityValue = 1;
    }
  }

  public revertScalingValue() {
    if (this.deviceType.isDesktop()) {
      this.scaleValue = 1.0;
      this.opacityValue = 0;
    }
  }

  public imageHasBeenLoaded() {
    this.imageHasLoaded = true;
    // Make it so that if a mobile device is being used then permanently set the overlay to be on,
    // because u can't hover on mobile devices.
    if (this.deviceType.isMobile() && this.albumTitle) {
      this.opacityValue = 1;
    } else {
      this.opacityValue = 0;
    }
  }

}
