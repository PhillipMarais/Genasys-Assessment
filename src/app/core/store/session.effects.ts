import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { login, logout } from './session.actions';

@Injectable()
export class SessionEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  login$ = createEffect(() => this.actions$.pipe(ofType(login), tap(({ name }) => { sessionStorage.setItem('genasys-user-name', name); this.router.navigateByUrl('/customers'); })), { dispatch: false });
  logout$ = createEffect(() => this.actions$.pipe(ofType(logout), tap(() => { sessionStorage.removeItem('genasys-user-name'); this.router.navigateByUrl('/login'); })), { dispatch: false });
}
