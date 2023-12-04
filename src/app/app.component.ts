import { Component } from '@angular/core'
import { GalleryFacade } from './state-management/gallery-list/gallery.facade'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private galleryFacade: GalleryFacade) {
    this.galleryFacade.loadGalleryList()
  }
}
