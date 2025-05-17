import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { Language, LanguageTranslation } from '../models/language.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly STORAGE_KEY = 'selected_language';
    private platformId = inject(PLATFORM_ID);
    private languages: Language[] = [
        {
            id: 1,
            code: 'en',
            name: 'English',
            flag: '🇺🇸',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 2,
            code: 'vn',
            name: 'Vietnamese',
            flag: '🇻🇳',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 3,
            code: 'es',
            name: 'Spanish',
            flag: '🇪🇸',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 4,
            code: 'fr',
            name: 'French',
            flag: '🇫🇷',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        }
    ];

    private translations: LanguageTranslation[] = [
        // English translations
        { id: 1, languageId: 1, key: 'settings', value: 'Settings', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, languageId: 1, key: 'theme', value: 'Theme', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, languageId: 1, key: 'language', value: 'Language', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, languageId: 1, key: 'dark_mode', value: 'Dark Mode', createdAt: new Date(), updatedAt: new Date() },
        { id: 5, languageId: 1, key: 'home', value: 'Home', createdAt: new Date(), updatedAt: new Date() },
        { id: 6, languageId: 1, key: 'team', value: 'Team', createdAt: new Date(), updatedAt: new Date() },
        { id: 7, languageId: 1, key: 'feature', value: 'Feature', createdAt: new Date(), updatedAt: new Date() },
        { id: 8, languageId: 1, key: 'blog', value: 'Blog', createdAt: new Date(), updatedAt: new Date() },
        { id: 9, languageId: 1, key: 'login', value: 'Login', createdAt: new Date(), updatedAt: new Date() },
        { id: 10, languageId: 1, key: 'signup', value: 'Sign up', createdAt: new Date(), updatedAt: new Date() },
        
        // Vietnamese translations
        { id: 11, languageId: 2, key: 'settings', value: 'Cài đặt', createdAt: new Date(), updatedAt: new Date() },
        { id: 12, languageId: 2, key: 'theme', value: 'Giao diện', createdAt: new Date(), updatedAt: new Date() },
        { id: 13, languageId: 2, key: 'language', value: 'Ngôn ngữ', createdAt: new Date(), updatedAt: new Date() },
        { id: 14, languageId: 2, key: 'dark_mode', value: 'Chế độ tối', createdAt: new Date(), updatedAt: new Date() },
        { id: 15, languageId: 2, key: 'home', value: 'Trang chủ', createdAt: new Date(), updatedAt: new Date() },
        { id: 16, languageId: 2, key: 'team', value: 'Đội ngũ', createdAt: new Date(), updatedAt: new Date() },
        { id: 17, languageId: 2, key: 'feature', value: 'Tính năng', createdAt: new Date(), updatedAt: new Date() },
        { id: 18, languageId: 2, key: 'blog', value: 'Blog', createdAt: new Date(), updatedAt: new Date() },
        { id: 19, languageId: 2, key: 'login', value: 'Đăng nhập', createdAt: new Date(), updatedAt: new Date() },
        { id: 20, languageId: 2, key: 'signup', value: 'Đăng ký', createdAt: new Date(), updatedAt: new Date() },

        // Spanish translations
        { id: 21, languageId: 3, key: 'settings', value: 'Ajustes', createdAt: new Date(), updatedAt: new Date() },
        { id: 22, languageId: 3, key: 'theme', value: 'Tema', createdAt: new Date(), updatedAt: new Date() },
        { id: 23, languageId: 3, key: 'language', value: 'Idioma', createdAt: new Date(), updatedAt: new Date() },
        { id: 24, languageId: 3, key: 'dark_mode', value: 'Modo oscuro', createdAt: new Date(), updatedAt: new Date() },
        { id: 25, languageId: 3, key: 'home', value: 'Inicio', createdAt: new Date(), updatedAt: new Date() },
        { id: 26, languageId: 3, key: 'team', value: 'Equipo', createdAt: new Date(), updatedAt: new Date() },
        { id: 27, languageId: 3, key: 'feature', value: 'Características', createdAt: new Date(), updatedAt: new Date() },
        { id: 28, languageId: 3, key: 'blog', value: 'Blog', createdAt: new Date(), updatedAt: new Date() },
        { id: 29, languageId: 3, key: 'login', value: 'Iniciar sesión', createdAt: new Date(), updatedAt: new Date() },
        { id: 30, languageId: 3, key: 'signup', value: 'Registrarse', createdAt: new Date(), updatedAt: new Date() },

        // French translations
        { id: 31, languageId: 4, key: 'settings', value: 'Paramètres', createdAt: new Date(), updatedAt: new Date() },
        { id: 32, languageId: 4, key: 'theme', value: 'Thème', createdAt: new Date(), updatedAt: new Date() },
        { id: 33, languageId: 4, key: 'language', value: 'Langue', createdAt: new Date(), updatedAt: new Date() },
        { id: 34, languageId: 4, key: 'dark_mode', value: 'Mode sombre', createdAt: new Date(), updatedAt: new Date() },
        { id: 35, languageId: 4, key: 'home', value: 'Accueil', createdAt: new Date(), updatedAt: new Date() },
        { id: 36, languageId: 4, key: 'team', value: 'Équipe', createdAt: new Date(), updatedAt: new Date() },
        { id: 37, languageId: 4, key: 'feature', value: 'Fonctionnalités', createdAt: new Date(), updatedAt: new Date() },
        { id: 38, languageId: 4, key: 'blog', value: 'Blog', createdAt: new Date(), updatedAt: new Date() },
        { id: 39, languageId: 4, key: 'login', value: 'Connexion', createdAt: new Date(), updatedAt: new Date() },
        { id: 40, languageId: 4, key: 'signup', value: "S'inscrire", createdAt: new Date(), updatedAt: new Date() }
    ];

    private currentLanguage = signal<Language>(this.getDefaultLanguage());
    private translationsSubject = new BehaviorSubject<{[key: string]: string}>({});

    constructor(private storageService: StorageService) {
        this.loadStoredLanguage();
        this.loadTranslations(this.currentLanguage().code);
    }

    private getSystemLanguage(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const browserLang = navigator.language.toLowerCase();
            // Check for exact matches first
            const exactMatch = this.languages.find(lang => 
                lang.code === browserLang || 
                lang.code === browserLang.split('-')[0]
            );
            if (exactMatch) {
                return exactMatch.code;
            }

            // Check for language matches without region
            const langMatch = this.languages.find(lang => 
                browserLang.startsWith(lang.code) || 
                browserLang.startsWith(lang.code + '-')
            );
            if (langMatch) {
                return langMatch.code;
            }
        }
        return null;
    }

    private getDefaultLanguage(): Language {
        // First try to get system language
        const systemLang = this.getSystemLanguage();
        if (systemLang) {
            const language = this.languages.find(lang => lang.code === systemLang);
            if (language) {
                return language;
            }
        }
        // Fallback to English or first available language
        return this.languages.find(lang => lang.code === 'en') || this.languages[0];
    }

    private loadStoredLanguage(): void {
        const storedLang = this.storageService.getItem(this.STORAGE_KEY);
        if (storedLang) {
            const language = this.languages.find(lang => lang.code === storedLang);
            if (language) {
                this.currentLanguage.set(language);
            }
        } else {
            // If no stored language, use system language
            const defaultLang = this.getDefaultLanguage();
            this.currentLanguage.set(defaultLang);
            // Store the default language
            this.storageService.setItem(this.STORAGE_KEY, defaultLang.code);
        }
    }

    private loadTranslations(languageCode: string): void {
        const language = this.languages.find(lang => lang.code === languageCode);
        if (!language) return;

        const translations = this.translations
            .filter(t => t.languageId === language.id)
            .reduce((acc, curr) => ({
                ...acc,
                [curr.key]: curr.value
            }), {});

        this.translationsSubject.next(translations);
    }

    getLanguages(): Observable<Language[]> {
        return of(this.languages.filter(lang => lang.isActive));
    }

    getCurrentLanguage(): Language {
        return this.currentLanguage();
    }

    getTranslations(): Observable<{[key: string]: string}> {
        return this.translationsSubject.asObservable();
    }

    setLanguage(languageCode: string): void {
        const language = this.languages.find(lang => lang.code === languageCode);
        if (!language) return;

        this.currentLanguage.set(language);
        this.storageService.setItem(this.STORAGE_KEY, languageCode);
        this.loadTranslations(languageCode);
    }

    translate(key: string): string {
        const translations = this.translationsSubject.value;
        return translations[key] || key;
    }
} 