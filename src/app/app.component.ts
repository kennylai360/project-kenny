import { Component } from '@angular/core';
import { GalleryFacade } from './state-management/gallery-list/gallery.facade';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        HeaderComponent,
        RouterOutlet,
        FooterComponent,
    ]
})
export class AppComponent {
  constructor(private galleryFacade: GalleryFacade) {
    this.galleryFacade.loadGalleryList();
  }
}
