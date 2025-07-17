import { ApplicationConfig, inject, PLATFORM_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { LoadingInterceptor } from './shared/spinner/loading.interceptor';
import { LanguageService } from './core/services/language.service';
import { isPlatformBrowser } from '@angular/common';
/**
 * Factory function for APP_INITIALIZER
 * Optimized cho SSR - chỉ init khi cần thiết
 */

const intializeAppLanguageFn = () => {
  const configService = inject(LanguageService);
  const platformId = inject(PLATFORM_ID);
  // Chỉ init trên browser, server sẽ skip
  if (isPlatformBrowser(platformId)) {
    return configService.initializeLanguageService();
  } else {
    return Promise.resolve();
  }
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideHttpClient(
    withFetch(),
    withInterceptorsFromDi()
  ),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
  provideAppInitializer(intializeAppLanguageFn),
  ],
};
