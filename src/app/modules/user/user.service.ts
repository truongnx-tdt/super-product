import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // 1. Inject HttpClient
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  constructor() { }

  // 5. Các API calls có auth
  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>('/tdt/auth/api/profile', {
      withCredentials: true
    });
  }

  updateProfile(data: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('/tdt/auth/api/profile', data, {
      withCredentials: true
    });
  }

  getCurrentUser(): User | null {
    return this.auth.user() || null;
  }
}
