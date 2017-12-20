import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-gallery-album',
  templateUrl: './gallery-album.component.html',
  styleUrls: ['./gallery-album.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryAlbumComponent implements OnInit, OnDestroy {

  private routeSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // load the album here which corresponds to the id. If it does not exist then i guess a redirect back to the
    // photography url is the best option?
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params['id']);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
