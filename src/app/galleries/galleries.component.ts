import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface IImage {
  img: string;
  thumb?: string;
  description?: string;
  extUrl?: string;
}

export interface IDescription {
  imageText?: string;
  number?: string;
  beforeText?: string;
  customFull?: string;
}

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GalleriesComponent implements OnInit {

  public imagesArray: Observable<IImage[]>;
  public descriptionObj: IDescription;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.imagesArray = this.getJSON();
    this.descriptionObj = {
      imageText: 'crap',
      number: '|',
      beforeText: 'Kapa',
      customFull: ' '
    };
  }

  // Split this up into another separate generic file which can be imported and used for other gallery components
  public getJSON(): Observable<any> {
    return this. http.get('../../assets/gallery-1.json')
      .map((res: any) => res.json());

  }
}
