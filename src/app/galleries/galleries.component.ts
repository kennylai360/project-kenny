import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { GalleryFacade } from '../state-management/facade/gallery.facade';

export interface ICoverContent {
  imgUrl: string;
  albumTitle: string;
  translateX: number;
  translateY: number;
}

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleriesComponent implements OnInit {

  public coverContent: Observable<ICoverContent[]>;

  public pageNumber: number = 1;

  constructor(
    private galleryFacade:  GalleryFacade
  ) {}

  public ngOnInit(): void {
    this.coverContent = this.galleryFacade.galleryList$;
  }
}
