import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriesModule } from './galleries/galleries.module';
import { HomeModule } from './home/home.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    ProfileComponent,
    GalleriesModule
  ],
  exports: [
  ],
  providers: []
})
export class PagesModule {
}
