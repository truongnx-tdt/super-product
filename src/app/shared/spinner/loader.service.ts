import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading = signal(false);
  readonly isLoading = this.loading.asReadonly();
  constructor() { }
  setLoading(loading: boolean) {
    this.loading.set(loading);
  }
}
