import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { User } from '../user/user.model';
import { LoaderService } from '../../shared/spinner/loader.service';
import { Router } from '@angular/router';

interface LoginRequest {
  username: string;
  password: string;
  capcha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // inject
  private router = inject(Router);
  private loader = inject(LoaderService);
  private http = inject(HttpClient);

  // Angular 19 signals
  private userSignal = signal<User | null>(null);
  private isInitializedSignal = signal<boolean>(false);

  // Computed signals
  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.userSignal() !== null);
  readonly isLoading = this.loader.isLoading;
  readonly isInitialized = this.isInitializedSignal.asReadonly();

  constructor(
  ) {
    // this.initializeAuth();
  }

  // 1. Initialize auth state
  private initializeAuth(): void {
    this.checkAuthStatus().subscribe();
  }

  // 2. Login method
  login(credentials: LoginRequest): Observable<ApiResponse<User>> {

    return this.http.post<ApiResponse<User>>('/login', credentials, {
      withCredentials: true 
    }).pipe(
      tap(response => {
        if (response.status === 200) {
          this.userSignal.set(response?.data || null);
        }
      }),
      catchError(error => {
        this.clearAuth();
        throw error;
      }),
    );
  }

  checkAuthStatus(): Observable<boolean> {
    if (this.isLoading()) return of(this.isAuthenticated());

    return this.http.get<ApiResponse<User>>('/tdt/auth/api/profile', {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.status === 200) {
          this.userSignal.set(response.data || null);
        } else {
          this.clearAuth();
        }
        this.isInitializedSignal.set(true);
      }),
      map(response => response.status === 200),
      catchError(error => {
        this.clearAuth();
        this.isInitializedSignal.set(true);
        return of(false);
      }),
    );
  }

  // 4. Logout
  logout(): Observable<any> {
    return this.http.post('/tdt/auth/api/logout', {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.clearAuth();
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        // Dù lỗi vẫn clear local auth state
        this.clearAuth();
        this.router.navigate(['/login']);
        return of(null);
      }),
    );
  }
  // Helper methods
  private clearAuth(): void {
    this.userSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // Kiểm tra xem auth đã được initialize chưa
  waitForInitialization(): Observable<boolean> {
    if (this.isInitialized()) {
      return of(this.isAuthenticated());
    }

    return this.checkAuthStatus();
  }
}
