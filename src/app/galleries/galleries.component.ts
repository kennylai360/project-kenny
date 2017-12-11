import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

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

  public coverContent: Observable<ICoverContent[]> = this.readJSONFile('../../assets/cover-content.json');

  public pageNumber: number = 1;

  constructor(private http: HttpClient) {
  }

  /**
   * TODO Move this method into it's own separate file which can be reused in other components
   * @param {string} fileLocation
   * @returns {Observable<any>}
   */
  public readJSONFile(fileLocation: string): Observable<ICoverContent[]> {
    return this.http.get(fileLocation)
      .map((res: any) => {
        return res;
      });



  }
}
