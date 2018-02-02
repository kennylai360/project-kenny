import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayContainerComponent } from './overlay-container.component';

@NgModule({
  declarations: [
    OverlayContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    OverlayContainerComponent
  ],
  providers: [],
})
export class OverlayContainerModule {
}
