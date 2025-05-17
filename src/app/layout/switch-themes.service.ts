import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../core/services/storage.service';

// Enum which contains only LIGHT and DARK themes, if DEVICE theme selected it means you don't need a value for this purpose. DEVICE theme means no user preferences in the app. That is why value should be undefined (removed from localStorage).
export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}
// name of variable in localStorage.
const LS_THEME = 'theme';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeSelectorService {
  private platformId = inject(PLATFORM_ID);
  private selectedTheme: AppTheme|undefined = undefined;

  constructor(private storageService: StorageService) {
    // if render happens on client side
    if (isPlatformBrowser(this.platformId)) {
      // then set value from localStorage or if it not available leave it undefined.
      this.selectedTheme = this.storageService.getItem(LS_THEME) as AppTheme || undefined;
    }
  }

  currentTheme = signal<AppTheme|undefined>(this.selectedTheme);

  setLightTheme() {
    this.currentTheme.set(AppTheme.LIGHT);
    this.setToLocalStorage(AppTheme.LIGHT);
    this.removeClassFromHtml('dark');
  }

  setDarkTheme() {
    this.currentTheme.set(AppTheme.DARK);
    this.setToLocalStorage(AppTheme.DARK);
    this.addClassToHtml('dark');
  }

  setSystemTheme() {
    this.currentTheme.set(undefined);
    this.removeFromLocalStorage();
    if (this.isSystemDark()) {
      this.addClassToHtml('dark');
    } else {
      this.removeClassFromHtml('dark');
    }
  }

  private addClassToHtml(className: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.removeClassFromHtml(className);
      document.documentElement.classList.add(className);
    }
  }

  private removeClassFromHtml(className: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.remove(className);
    }
  }

  private setToLocalStorage(theme: AppTheme) {
    this.storageService.setItem(LS_THEME, theme);
  }

  private removeFromLocalStorage() {
    this.storageService.removeItem(LS_THEME);
  }

  private isSystemDark(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }
}