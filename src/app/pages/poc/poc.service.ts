import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IGalleryCover} from '../../state-management/gallery-list/gallery-cover.interface';
import {GalleryLoadDataSuccessAction} from '../../state-management/gallery-list/gallery.actions';

@Injectable({
  providedIn: 'root',
})
export class PocService {

  constructor(private http: HttpClient) {

  }

  public doSomethingServiceCall(): void {
  }

  public getAllTableData(): any {
    console.log('Make API call here');
  }


};