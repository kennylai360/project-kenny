import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface ICoverContent {
  imgUrl: string;
  coverTitle: string;
  translateX: number;
  translateY: number;
}

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleriesComponent {

  public coverContent: Observable<ICoverContent[]> = this.readJSONFile();

  constructor(private http: Http) {

  }

  // Split this up into another separate generic file which can be imported and used for other gallery components
  public readJSONFile(): Observable<any> {
    return this. http.get('../../assets/cover-content.json')
      .map((res: any) => res.json());

  }
}
