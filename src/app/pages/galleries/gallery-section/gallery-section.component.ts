import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { GalleryFacade } from '../../../state-management/gallery-list/gallery.facade'

@Component({
    selector: 'app-gallery-section',
    templateUrl: './gallery-section.component.html',
    imports: [RouterModule]
})
export class GallerySectionComponent {
  private galleryFacade = inject(GalleryFacade);

  constructor() {
    this.galleryFacade.loadGalleryList();
  }
}
