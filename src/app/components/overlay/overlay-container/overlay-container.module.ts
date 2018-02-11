import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayContainerComponent } from './overlay-container.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    OverlayContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LazyLoadImageModule
  ],
  exports: [
    OverlayContainerComponent
  ],
  providers: [],
})
export class OverlayContainerModule {
}
