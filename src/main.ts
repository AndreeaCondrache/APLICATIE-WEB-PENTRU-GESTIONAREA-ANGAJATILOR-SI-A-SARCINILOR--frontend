import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { authInterceptor } from './app/auth/services/auth/auth.interceptor'; // noul export

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptors([authInterceptor])), // funcția, nu clasa
  ],
})
  .catch((err) => console.error(err));
