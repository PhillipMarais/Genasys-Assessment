import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { sessionFeature } from './session.reducer';

/** Allows dashboard access only while the mock session is present. */
export const sessionGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(sessionFeature.selectUserName).pipe(
    take(1),
    map((userName) => userName ? true : router.createUrlTree(['/login']))
  );
};

/** Keeps an authenticated user out of the mock sign-in page. */
export const guestOnlyGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(sessionFeature.selectUserName).pipe(
    take(1),
    map((userName) => userName ? router.createUrlTree(['/customers']) : true)
  );
};
