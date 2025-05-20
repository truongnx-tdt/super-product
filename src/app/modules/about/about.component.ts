import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ translate('about_title') }}
          </h1>
        </div>

        <!-- Mission Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ translate('about_mission') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ translate('about_mission_text') }}
          </p>
        </div>

        <!-- Vision Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {{ translate('about_vision') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ translate('about_vision_text') }}
          </p>
        </div>

        <!-- Values Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ translate('about_values') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
                {{ translate('about_quality') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                We are committed to delivering the highest quality education through expert instructors and comprehensive curriculum.
              </p>
            </div>
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
                {{ translate('about_innovation') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                We continuously innovate our teaching methods and technology to provide the best learning experience.
              </p>
            </div>
            <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
                {{ translate('about_accessibility') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                We believe education should be accessible to everyone, regardless of their location or background.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {
  constructor(private languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }
} 