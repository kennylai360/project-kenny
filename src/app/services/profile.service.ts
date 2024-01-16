import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  static readonly profileContentUrl: string =
    '../../assets/profile-content.json';
  constructor(private httpClient: HttpClient) {}

  public loadProfileContent(): Observable<object> {
    return this.httpClient.get(ProfileService.profileContentUrl);
  }
}
