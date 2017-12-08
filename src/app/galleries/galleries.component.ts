import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GalleriesComponent {

  constructor(private http: Http) {}

  // Split this up into another separate generic file which can be imported and used for other gallery components
  public readJSONFile(): Observable<any> {
    return this. http.get('../../assets/gallery-1.json')
      .map((res: any) => res.json());

  }
}
