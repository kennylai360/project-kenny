import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryCoverModule } from '../../components/gallery-cover/gallery-cover.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalleriesComponent } from '../galleries/galleries.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule {
}
