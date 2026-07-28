import { Routes } from '@angular/router';
import { guestOnlyGuard, sessionGuard } from './core/store/session.guards';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', canActivate: [guestOnlyGuard], loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent) },
  {
    path: 'customers',
    canActivate: [sessionGuard],
    children: [
      { path: '', loadComponent: () => import('./features/customers/customer-list.component').then((m) => m.CustomerListComponent) },
      { path: 'new', loadComponent: () => import('./features/customers/customer-form.component').then((m) => m.CustomerFormComponent) },
      { path: ':id/edit', loadComponent: () => import('./features/customers/customer-form.component').then((m) => m.CustomerFormComponent) }
    ]
  },
  {
    path: 'quotes',
    canActivate: [sessionGuard],
    loadComponent: () => import('./features/quotes/quote-list.component').then((m) => m.QuoteListComponent)
  },
  { path: '**', redirectTo: 'customers' }
];
