import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { OverlayContainerModule } from '../../components/overlay/overlay-container/overlay-container.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayContainerModule
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule {
}
