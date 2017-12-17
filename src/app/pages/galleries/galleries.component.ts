import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GalleryFacade } from '../../state-management/gallery-list/gallery.facade';
import { IGalleryCover } from '../../state-management/gallery-list/gallery-cover.interface';


@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleriesComponent implements OnInit {

  public coverContent: Observable<IGalleryCover[]>;

  public pageNumber: number = 1;

  constructor(
    private galleryFacade:  GalleryFacade
  ) {}

  public ngOnInit(): void {
    this.coverContent = this.galleryFacade.galleryList$;
  }
}
