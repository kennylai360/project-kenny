import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriesModule } from './galleries/galleries.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ProfileContentComponent } from '../components/profile-content/profile-content.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    ProfileComponent,
    GalleriesModule,
    ProfileContentComponent,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
