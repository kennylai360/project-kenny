import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  static readonly profileContentUrl: string =
    '../../assets/profile-content.json';

  private httpClient = inject(HttpClient);

  public loadProfileContent(): Observable<object> {
    return this.httpClient.get(ProfileService.profileContentUrl);
  }
}
