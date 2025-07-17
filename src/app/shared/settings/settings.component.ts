import { Component, OnInit, OnDestroy, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DarkThemeSelectorService } from '../../layout/switch-themes.service';
import { LanguageService } from '../../core/services/language.service';
import { Language } from '../../core/models/language.model';
import { SettingsIconComponent, CloseIconComponent, ChevronDownIconComponent } from '../icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SettingsIconComponent,
    CloseIconComponent,
    ChevronDownIconComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Input() showDirectSettings = false;

  // Signals for reactive state
  isOpen = signal(false);
  languages = signal<Language[]>([]); // list languages in select option
  currentLanguage = signal<Language>({} as Language);
  isLanguageServiceReady = signal(false);
  isLoadingLanguages = signal(false);

  // Subscription management
  private destroy$ = new Subject<void>();

  constructor(
    protected darkThemeSelectorService: DarkThemeSelectorService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.initializeLanguageData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize language data
   */
  private initializeLanguageData() {
    // Check if language service is ready
    this.isLanguageServiceReady.set(this.languageService.isReady());

    if (this.languageService.isReady()) {
      // Language service is ready, load data immediately
      this.loadLanguageData();
    } else {
      // Language service not ready, show loading state
      this.isLoadingLanguages.set(true);

      // Poll for language service readiness
      const checkReadiness = () => {
        if (this.languageService.isReady()) {
          this.loadLanguageData();
          this.isLoadingLanguages.set(false);
        } else {
          setTimeout(checkReadiness, 100);
        }
      };
      checkReadiness();
    }
  }

  /**
   * Load language data from service
   */
  private loadLanguageData() {
    // Set languages
    this.languages.set(this.languageService.languages);
    // Set current language
    this.currentLanguage.set(this.languageService.currentLanguage());
    this.isLanguageServiceReady.set(true);
  }
  /**
   * Toggle settings panel
   */
  toggleSettings() {
    this.isOpen.set(!this.isOpen());
  }

  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    if (this.darkThemeSelectorService.currentTheme() === 'dark') {
      this.darkThemeSelectorService.setLightTheme();
    } else {
      this.darkThemeSelectorService.setDarkTheme();
    }
  }

  /**
   * Set language and handle UI updates
   */
  setLanguage(langCode: string) {
    if (!langCode || langCode === this.currentLanguage().id) {
      return;
    }

    const selectedLanguage = this.languages().find(lang => lang.id === langCode);
    if (!selectedLanguage) {
      console.warn('Language not found:', langCode);
      return;
    }

    try {
      // Update language in service
      this.languageService.setLanguage(langCode);

      // Update local state
      this.currentLanguage.set(selectedLanguage);

    } catch (error) {
      console.error('Error setting language:', error);
    }
  }

  /**
   * Translate a key
   */
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  /**
   * Check if language service is ready
   */
  isReady(): boolean {
    return this.isLanguageServiceReady();
  }

  /**
   * Refresh languages from server
   */
  refreshLanguages() {
    this.isLoadingLanguages.set(true);

    this.languageService.refreshLanguageData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success) => {
          this.isLoadingLanguages.set(false);
          if (success) {
            this.languages.set(this.languageService.languages);
          } else {
          }
        },
        error: (error) => {
          this.isLoadingLanguages.set(false);
          console.error('Error refreshing languages:', error);
        }
      });
  }
}