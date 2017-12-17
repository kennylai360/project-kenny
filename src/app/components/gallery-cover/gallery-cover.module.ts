import { NgModule } from '@angular/core';
import { GalleryCoverComponent } from './gallery-cover.component';
import { BrowserModule } from '@angular/platform-browser';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GalleryCoverComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    LazyLoadImageModule
  ],
  exports: [
    GalleryCoverComponent
  ],
  providers: []
})
export class GalleryCoverModule {
}
