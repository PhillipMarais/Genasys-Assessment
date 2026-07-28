import { ApplicationConfig, isDevMode, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { SessionEffects } from './core/store/session.effects';
import { initializeSession } from './core/store/session.initializer';
import { sessionFeature } from './core/store/session.reducer';
import { CustomersEffects } from './features/customers/store/customers.effects';
import { customersFeature } from './features/customers/store/customers.reducer';
import { QuotesEffects } from './features/quotes/store/quotes.effects';
import { quotesFeature } from './features/quotes/store/quotes.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    provideRouter(routes),
    // Customers and quotes are registered at root rather than per-route: the quotes page reads
    // customer data (filter dropdown, add/edit dialog) and customer deletion cascades into
    // quotes, so both slices need to exist regardless of which route was visited first — a
    // route-scoped registration meant a hard refresh landing directly on /quotes could read
    // customersFeature before its reducer was ever registered.
    provideStore({
      [sessionFeature.name]: sessionFeature.reducer,
      [customersFeature.name]: customersFeature.reducer,
      [quotesFeature.name]: quotesFeature.reducer
    }),
    provideEffects(SessionEffects, CustomersEffects, QuotesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(initializeSession)
  ]
};
