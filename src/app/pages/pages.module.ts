import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriesModule } from './galleries/galleries.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    ProfileModule,
    GalleriesModule
  ],
  exports: [
  ],
  providers: []
})
export class PagesModule {
}
