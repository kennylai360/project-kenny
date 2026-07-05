import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoincapService {
  private httpClient: HttpClient = inject(HttpClient);

  private btcAssetData$: Observable<any>;
  private ratesData$: Observable<any>;

  public getBtcAssetData(): Observable<any> {
    if (!this.btcAssetData$) {
      this.btcAssetData$ = this.httpClient
        .get(environment.coinCapApi + `/bitcoin-markets`)
        .pipe(shareReplay(1));
    }
    return this.btcAssetData$;
  }

  public getRatesData(): Observable<any> {
    if (!this.ratesData$) {
      this.ratesData$ = this.httpClient
        .get(environment.coinCapApi + `/rates`)
        .pipe(shareReplay(1));
    }
    return this.ratesData$;
  }
}
