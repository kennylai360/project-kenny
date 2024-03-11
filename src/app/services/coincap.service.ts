import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoincapService {
  private httpClient: HttpClient = inject(HttpClient);

  public getBtcAssetData(): Observable<any> {
    return this.httpClient.get(
      'https://api.coincap.io/v2/assets/bitcoin/markets'
    );
  }

  public getRatesData(): Observable<any> {
    return this.httpClient.get('https://api.coincap.io/v2/rates');
  }
}
