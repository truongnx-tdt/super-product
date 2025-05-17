import { Component, OnInit, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
export class SettingsComponent implements OnInit {
  @Input() showDirectSettings = false;
  isOpen = signal(false);
  languages: Language[] = [];
  translations = signal<{[key: string]: string}>({});

  constructor(
    protected darkThemeSelectorService: DarkThemeSelectorService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Load languages
    this.languageService.getLanguages().subscribe(langs => {
      this.languages = langs;
    });

    // Subscribe to translations
    this.languageService.getTranslations().subscribe(trans => {
      this.translations.set(trans);
    });
  }

  toggleSettings() {
    this.isOpen.set(!this.isOpen());
  }

  toggleDarkMode() {
    if (this.darkThemeSelectorService.currentTheme() === 'dark') {
      this.darkThemeSelectorService.setLightTheme();
    } else {
      this.darkThemeSelectorService.setDarkTheme();
    }
  }

  setLanguage(langCode: string) {
    this.languageService.setLanguage(langCode);
  }

  getCurrentLanguage(): Language {
    return this.languageService.getCurrentLanguage();
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 