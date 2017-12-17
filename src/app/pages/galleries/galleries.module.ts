import { NgModule } from '@angular/core';
import { GalleriesComponent } from './galleries.component';
import { CommonModule } from '@angular/common';
import { GalleryCoverModule } from '../../components/gallery-cover/gallery-cover.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    GalleriesComponent
  ],
  imports: [
    CommonModule,
    GalleryCoverModule,
    NgxPaginationModule
  ],
  exports: [
    GalleriesComponent
  ],
  providers: []
})
export class GalleriesModule {
}
