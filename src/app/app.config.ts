import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http'; // ✅ corect
import { authInterceptor } from './auth/services/auth/auth.interceptor'; // ✅ ajustează path-ul dacă e altul

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(FormsModule),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()) // ✅ combinat corect
  ]
};
