import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { restoreSession } from './session.actions';

const SESSION_USER_NAME_KEY = 'genasys-user-name';

/** Restores the lightweight demo session before the router performs its first navigation. */
export function initializeSession(): void {
  const store = inject(Store);
  const storedName = window.sessionStorage.getItem(SESSION_USER_NAME_KEY)?.trim();

  if (storedName) {
    store.dispatch(restoreSession({ name: storedName }));
  }
}
