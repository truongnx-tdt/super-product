import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { Language, LanguageTranslation } from '../models/language.model';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, shareReplay, tap, throwError, firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { ApiResponse } from '../models/api-response';
import { APIEndpoints } from '../models/common';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // Inject Dependencies
    private _httpClient = inject(HttpClient);

    // Environment Variables
    protected readonly API_URL = environment.guestDomain;

    // Storage Keys
    private readonly STORAGE_KEY = 'selected_language';
    private readonly LANGUAGES_CACHE_KEY = 'languages_cache';
    private readonly TRANSLATIONS_CACHE_KEY = 'translations_cache';
    private readonly CACHE_TIMESTAMP_KEY = 'cache_timestamp';
    private readonly CACHE_DURATION = 6 * 60 * 60 * 1000;

    // State
    public languages: Language[] = [];
    public translations: LanguageTranslation[] = [];
    public currentLanguage = signal<Language>(this.getDefaultLanguage());
    public translationsSubject = new BehaviorSubject<{ [key: string]: string }>({});

    // Cached Observables - Thêm static để share giữa server/client
    private static languagesCache$: Observable<Language[]> | null = null;
    private static translationsCache$: Observable<LanguageTranslation[]> | null = null;
    private static isInitialized = false;

    // Thêm in-memory cache cho SSR
    private static memoryCache: Map<string, { data: any; timestamp: number }> = new Map();

    private platformId = inject(PLATFORM_ID);

    constructor(private storageService: StorageService) { }

    /**
     * Initialize language service - should be called in APP_INITIALIZER
     */
    async initializeLanguageService(): Promise<void> {
        // Kiểm tra nếu đã initialized
        if (LanguageService.isInitialized) {
            return;
        }

        try {
            // Load languages and translations in parallel
            const [languages, translations] = await firstValueFrom(
                forkJoin([
                    this.loadLanguagesWithCache(),
                    this.loadTranslationsWithCache()
                ])
            );

            this.languages = languages || [];
            this.translations = translations || [];

            // Set initial language
            this.loadStoredLanguage();
            this.loadTranslations(this.currentLanguage().id);

            LanguageService.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize language service:', error);
            // Fallback to cached data if available
            this.loadFromCache();
        }
    }

    /**
     * Load languages with caching strategy
     */
    private loadLanguagesWithCache(): Observable<Language[]> {
        // Kiểm tra static cache trước
        if (LanguageService.languagesCache$) {
            return LanguageService.languagesCache$;
        }

        // Kiểm tra memory cache (cho SSR)
        const memoryData = this.getMemoryCache<Language[]>(this.LANGUAGES_CACHE_KEY);
        if (memoryData) {
            LanguageService.languagesCache$ = of(memoryData);
            return LanguageService.languagesCache$;
        }

        // Check browser cache
        const cachedLanguages = this.getCachedData<Language[]>(this.LANGUAGES_CACHE_KEY);
        if (cachedLanguages && this.isCacheValid()) {
            LanguageService.languagesCache$ = of(cachedLanguages);
            return LanguageService.languagesCache$;
        }

        // Fetch from API and cache
        LanguageService.languagesCache$ = this._httpClient.get<ApiResponse<Language[]>>(`${this.API_URL}${APIEndpoints.GET_LANGUAGES}`)
            .pipe(
                map(response => response.data ?? []),
                tap(languages => {
                    this.setCachedData(this.LANGUAGES_CACHE_KEY, languages);
                    this.setMemoryCache(this.LANGUAGES_CACHE_KEY, languages);
                    this.updateCacheTimestamp();
                }),
                catchError(error => {
                    console.error('Error loading languages:', error);
                    // Return cached data if API fails
                    const fallbackData = this.getCachedData<Language[]>(this.LANGUAGES_CACHE_KEY) ||
                        this.getMemoryCache<Language[]>(this.LANGUAGES_CACHE_KEY);
                    return fallbackData ? of(fallbackData) : throwError(error);
                }),
                shareReplay(1)
            );

        return LanguageService.languagesCache$;
    }

    /**
     * Load translations with caching strategy
     */
    private loadTranslationsWithCache(): Observable<LanguageTranslation[]> {
        // Kiểm tra static cache trước
        if (LanguageService.translationsCache$) {
            return LanguageService.translationsCache$;
        }

        // Kiểm tra memory cache (cho SSR)
        const memoryData = this.getMemoryCache<LanguageTranslation[]>(this.TRANSLATIONS_CACHE_KEY);
        if (memoryData) {
            LanguageService.translationsCache$ = of(memoryData);
            return LanguageService.translationsCache$;
        }

        // Check browser cache
        const cachedTranslations = this.getCachedData<LanguageTranslation[]>(this.TRANSLATIONS_CACHE_KEY);
        if (cachedTranslations && this.isCacheValid()) {
            LanguageService.translationsCache$ = of(cachedTranslations);
            return LanguageService.translationsCache$;
        }

        // Fetch from API and cache
        LanguageService.translationsCache$ = this._httpClient.get<ApiResponse<LanguageTranslation[]>>(`${this.API_URL}${APIEndpoints.GET_TRANSLATIONS}`)
            .pipe(
                map(response => response.data ?? []),
                tap(translations => {
                    this.setCachedData(this.TRANSLATIONS_CACHE_KEY, translations);
                    this.setMemoryCache(this.TRANSLATIONS_CACHE_KEY, translations);
                    this.updateCacheTimestamp();
                }),
                catchError(error => {
                    // Return cached data if API fails
                    const fallbackData = this.getCachedData<LanguageTranslation[]>(this.TRANSLATIONS_CACHE_KEY) ||
                        this.getMemoryCache<LanguageTranslation[]>(this.TRANSLATIONS_CACHE_KEY);
                    return fallbackData ? of(fallbackData) : throwError(error);
                }),
                shareReplay(1)
            );

        return LanguageService.translationsCache$;
    }

    /**
     * Memory cache methods for SSR
     */
    private getMemoryCache<T>(key: string): T | null {
        const cached = LanguageService.memoryCache.get(key);
        if (!cached) return null;

        // Kiểm tra expire time
        const now = Date.now();
        if ((now - cached.timestamp) > this.CACHE_DURATION) {
            LanguageService.memoryCache.delete(key);
            return null;
        }

        return cached.data;
    }

    private setMemoryCache<T>(key: string, data: T): void {
        LanguageService.memoryCache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Force refresh data from API and update cache
     */
    public refreshLanguageData(): Observable<boolean> {
        // Clear all caches
        this.clearCache();
        this.clearMemoryCache();
        LanguageService.languagesCache$ = null;
        LanguageService.translationsCache$ = null;

        return forkJoin([
            this.loadLanguagesWithCache(),
            this.loadTranslationsWithCache()
        ]).pipe(
            map(([languages, translations]) => {
                this.languages = languages;
                this.translations = translations;
                this.loadTranslations(this.currentLanguage().id);
                return true;
            }),
            catchError(error => {
                console.error('Error refreshing language data:', error);
                return of(false);
            })
        );
    }

    /**
     * Cache management methods
     */
    private isCacheValid(): boolean {
        if (!isPlatformBrowser(this.platformId)) return false;

        const timestamp = this.storageService.sessionGetItem(this.CACHE_TIMESTAMP_KEY);
        if (!timestamp) return false;

        const cacheTime = parseInt(timestamp, 10);
        const now = Date.now();
        return (now - cacheTime) < this.CACHE_DURATION;
    }

    private updateCacheTimestamp(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.storageService.sessionSetItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
        }
    }

    private getCachedData<T>(key: string): T | null {
        if (!isPlatformBrowser(this.platformId)) return null;

        try {
            const data = this.storageService.sessionGetItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error parsing cached data:', error);
            return null;
        }
    }

    private setCachedData<T>(key: string, data: T): void {
        if (isPlatformBrowser(this.platformId)) {
            try {
                this.storageService.sessionSetItem(key, JSON.stringify(data));
            } catch (error) {
                console.error('Error caching data:', error);
            }
        }
    }

    private clearCache(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.storageService.sessionRemoveItem(this.LANGUAGES_CACHE_KEY);
            this.storageService.sessionRemoveItem(this.TRANSLATIONS_CACHE_KEY);
            this.storageService.sessionRemoveItem(this.CACHE_TIMESTAMP_KEY);
        }
    }

    private clearMemoryCache(): void {
        LanguageService.memoryCache.clear();
    }

    private loadFromCache(): void {
        const cachedLanguages = this.getCachedData<Language[]>(this.LANGUAGES_CACHE_KEY) ||
            this.getMemoryCache<Language[]>(this.LANGUAGES_CACHE_KEY);
        const cachedTranslations = this.getCachedData<LanguageTranslation[]>(this.TRANSLATIONS_CACHE_KEY) ||
            this.getMemoryCache<LanguageTranslation[]>(this.TRANSLATIONS_CACHE_KEY);

        if (cachedLanguages) {
            this.languages = cachedLanguages;
        }
        if (cachedTranslations) {
            this.translations = cachedTranslations;
        }

        if (this.languages.length > 0) {
            this.loadStoredLanguage();
            this.loadTranslations(this.currentLanguage().id);
            LanguageService.isInitialized = true;
        }
    }

    /**
     * System language detection
     */
    private getSystemLanguage(): string | null {
        if (!isPlatformBrowser(this.platformId)) return null;

        const browserLang = navigator.language.toLowerCase();

        // Check for exact matches first
        const exactMatch = this.languages.find(lang =>
            lang.id === browserLang ||
            lang.id === browserLang.split('-')[0]
        );
        if (exactMatch) {
            return exactMatch.id;
        }

        // Check for language matches without region
        const langMatch = this.languages.find(lang =>
            browserLang.startsWith(lang.id) ||
            browserLang.startsWith(lang.id + '-')
        );
        if (langMatch) {
            return langMatch.id;
        }

        return null;
    }

    public getDefaultLanguage(): Language {
        // First try to get system language
        const systemLang = this.getSystemLanguage();
        if (systemLang) {
            const language = this.languages.find(lang => lang.id === systemLang);
            if (language) {
                return language;
            }
        }
        // Fallback to Vietnamese or first available language
        return this.languages.find(lang => lang.id === 'vn') || this.languages[0] || { id: 'vn', name: 'Vietnamese' };
    }

    private loadStoredLanguage(): void {
        const storedLang = this.storageService.getItem(this.STORAGE_KEY);
        if (storedLang) {
            const language = this.languages.find(lang => lang.id === storedLang);
            if (language) {
                this.currentLanguage.set(language);
                return;
            }
        }
        // If no stored language, use system language
        const defaultLang = this.getDefaultLanguage();
        this.currentLanguage.set(defaultLang);
        // Store the default language
        this.storageService.setItem(this.STORAGE_KEY, defaultLang.id);
    }

    private loadTranslations(languageCode: string): void {
        const language = this.languages.find(lang => lang.id === languageCode);
        if (!language) return;

        const translations = this.translations
            .filter(t => t.languageCode === language.id)
            .reduce((acc, curr) => ({
                ...acc,
                [curr.key]: curr.value
            }), {});

        this.translationsSubject.next(translations);
    }

    /**
     * Public API methods
     */
    public getLanguages(): Observable<Language[]> {
        return this.loadLanguagesWithCache();
    }

    public getCurrentLanguage(): Language {
        return this.currentLanguage();
    }

    public getTranslations(): Observable<{ [key: string]: string }> {
        return this.translationsSubject.asObservable();
    }

    public setLanguage(languageCode: string): void {
        const language = this.languages.find(lang => lang.id === languageCode);
        if (!language) return;

        this.currentLanguage.set(language);
        this.storageService.setItem(this.STORAGE_KEY, languageCode);
        this.loadTranslations(languageCode);
    }

    public translate(key: string): string {
        const translations = this.translationsSubject.value;
        return translations[key] || key;
    }

    public isReady(): boolean {
        return LanguageService.isInitialized;
    }
}