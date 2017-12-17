import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CounterFacade } from './state-management/counter/counter-facade';
import { GalleryFacade } from './state-management/gallery-list/gallery.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public counterValue$:  Observable<number>;

  constructor(private counterFacade: CounterFacade,
              private galleryFacade: GalleryFacade) {

    this.galleryFacade.loadGalleryList();

    this.counterValue$ = this.counterFacade.counterValue$;
  }

}


