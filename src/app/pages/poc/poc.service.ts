import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PocService {

  constructor(private http: HttpClient) {

  }

  public getAllTableData(): Observable<any> {
    return this.http.get('https://itqycq5k9d.execute-api.us-west-2.amazonaws.com/Prod/v1/shoppinglist').pipe(
      map((res: any) => {
        return Object.keys(res).map((key: string) => {
          return {
            itemName: key,
            itemAmount: res[key]
          };
        });
      }));
  }

  public addItem(item: {Name: string, Quantity: number}): Observable<any> {
    return this.http.post('https://itqycq5k9d.execute-api.us-west-2.amazonaws.com/Prod/v1/shoppinglist', item).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  }

  public deleteItem(name: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({

      }),
      body: {
        Name: name
      }
    }

    return this.http.delete('https://itqycq5k9d.execute-api.us-west-2.amazonaws.com/Prod/v1/shoppinglist', options).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  }


}
