import { NgClass, NgStyle } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-gallery-album-cover',
    templateUrl: './gallery-album-cover.component.html',
    styleUrl: './gallery-album-cover.component.scss',
    imports: [NgClass, NgStyle, LazyLoadImageModule]
})
export class GalleryAlbumCoverComponent {
  private deviceType = inject(DeviceDetectorService);

  public imgUrl = input.required<string>();
  public albumTitle = input<string | null>(null);
  public translateX = input<number>(0);
  public translateY = input<number>(0);
  public hasImageLoadedEmitter = output<string>();

  public scaleValue = signal(1.0);

  public opacityValue = signal(0);

  public imageHasLoaded: boolean = false;

  // Function should only really call when it is in desktop mode for hovering over the album cover,
  // and same before the function below.
  public increaseScalingValue() {
    if (this.deviceType.isDesktop()) {
      this.scaleValue.set(1.2);
      this.opacityValue.set(1);
    }
  }

  public revertScalingValue() {
    if (this.deviceType.isDesktop()) {
      this.scaleValue.set(1.0);
      this.opacityValue.set(0);
    }
  }

  public imageHasBeenLoaded() {
    this.imageHasLoaded = true;
    this.hasImageLoadedEmitter.emit(this.imgUrl());
    // Make it so that if a mobile device is being used then permanently set the overlay to be on,
    // because u can't hover on mobile devices.
    if (this.deviceType.isMobile() && this.albumTitle) {
      this.opacityValue.set(1);
    } else {
      this.opacityValue.set(0);
    }
  }
}
