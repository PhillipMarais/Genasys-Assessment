import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { guestOnlyGuard, sessionGuard } from './core/store/session.guards';
import { CustomersEffects } from './features/customers/store/customers.effects';
import { customersFeature } from './features/customers/store/customers.reducer';
import { QuotesEffects } from './features/quotes/store/quotes.effects';
import { quotesFeature } from './features/quotes/store/quotes.reducer';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', canActivate: [guestOnlyGuard], loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent) },
  {
    path: 'customers',
    canActivate: [sessionGuard],
    providers: [provideState(customersFeature), provideEffects(CustomersEffects)],
    children: [
      { path: '', loadComponent: () => import('./features/customers/customer-list.component').then((m) => m.CustomerListComponent) },
      { path: 'new', loadComponent: () => import('./features/customers/customer-form.component').then((m) => m.CustomerFormComponent) },
      { path: ':id/edit', loadComponent: () => import('./features/customers/customer-form.component').then((m) => m.CustomerFormComponent) }
    ]
  },
  {
    path: 'quotes',
    canActivate: [sessionGuard],
    providers: [provideState(quotesFeature), provideEffects(QuotesEffects)],
    loadComponent: () => import('./features/quotes/quote-list.component').then((m) => m.QuoteListComponent)
  },
  { path: '**', redirectTo: 'customers' }
];
