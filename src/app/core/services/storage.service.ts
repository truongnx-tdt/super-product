import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private platformId = inject(PLATFORM_ID);
    //#region  Local Storage
    getItem(key: string): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
        return null;
    }

    setItem(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }

    removeItem(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        }
    }

    clear(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }
    //#endregion
    //#region  Session Storage
    sessionGetItem(key: string): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return sessionStorage.getItem(key);
        }
        return null;
    }
    sessionSetItem(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem(key, value);   
        }
    }
    sessionRemoveItem(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.removeItem(key);
        }
    }
    sessionClear(): void {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.clear();
        }
    }
    //#endregion
} 