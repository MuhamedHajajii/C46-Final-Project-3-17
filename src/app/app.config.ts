import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { environmentInterceptor } from './core/interceptors/environment.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    // angular v21 ==>> provide http client
    // SSR
    provideHttpClient(
      withFetch(),
      withInterceptors([
        environmentInterceptor,
        cacheInterceptor,
        tokenInterceptor,
        loadingInterceptor,
        errorInterceptor,
      ]),
    ),
    provideClientHydration(withEventReplay()),
    provideToastr({
      preventDuplicates: true,
    }),
  ],
};
