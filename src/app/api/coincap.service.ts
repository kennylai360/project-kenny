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
      'https://rest.coincap.io/v3/assets/bitcoin/markets?apiKey=71171ef8f6d0d96a658bb88f01b51377f1b79832fc4d62088fcefb67efc0417d'
    );
  }

  public getRatesData(): Observable<any> {
    return this.httpClient.get(
      'https://rest.coincap.io/v3/rates?apiKey=71171ef8f6d0d96a658bb88f01b51377f1b79832fc4d62088fcefb67efc0417d'
    );
  }
}
