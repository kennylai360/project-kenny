import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoincapService {
  private httpClient: HttpClient = inject(HttpClient);

  public getBtcAssetData(): Observable<any> {
    return this.httpClient.get(environment.coinCapApi + `/bitcoin-markets`);
  }

  public getRatesData(): Observable<any> {
    return this.httpClient.get(environment.coinCapApi + `/rates`);
  }
}
