import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { environment } from '../../../environments/environment';

interface LoginRequest {
  username: string;
  password: string;
  capcha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiDomain = environment.authDomain;
  constructor(private http: HttpClient) { }

  login(req: LoginRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`/login`, (req));
  }

  loginWithGoogle(req: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`/google-login`, { req });
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiDomain}/api/logout`, {});
  }

  logoutAll(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiDomain}/api/logout-all`, {});
  }
}
