import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { deleteQuotesByCustomer } from '../../quotes/store/quotes.actions';
import {
  addCustomer,
  addCustomerSuccess,
  deleteCustomer,
  deleteCustomerSuccess,
  updateCustomer,
  updateCustomerSuccess
} from './customers.actions';
import { CUSTOMERS_STORAGE_KEY, customersFeature } from './customers.reducer';

const SIMULATED_LATENCY_MS = 150;

@Injectable()
export class CustomersEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCustomer),
      switchMap(({ customer }) => of(customer).pipe(delay(SIMULATED_LATENCY_MS), map((c) => addCustomerSuccess({ customer: c }))))
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCustomer),
      switchMap(({ customer }) => of(customer).pipe(delay(SIMULATED_LATENCY_MS), map((c) => updateCustomerSuccess({ customer: c }))))
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCustomer),
      switchMap(({ id }) => of(id).pipe(delay(SIMULATED_LATENCY_MS), map((deletedId) => deleteCustomerSuccess({ id: deletedId }))))
    )
  );

  cascadeDeleteQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCustomerSuccess),
      map(({ id }) => deleteQuotesByCustomer({ customerId: id }))
    )
  );

  notifyOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomerSuccess, updateCustomerSuccess, deleteCustomerSuccess),
        tap((action) => {
          switch (action.type) {
            case addCustomerSuccess.type:
              this.snackBar.open('Customer added.', 'Dismiss', { duration: 3000 });
              this.router.navigateByUrl('/customers');
              break;
            case updateCustomerSuccess.type:
              this.snackBar.open('Customer updated.', 'Dismiss', { duration: 3000 });
              this.router.navigateByUrl('/customers');
              break;
            case deleteCustomerSuccess.type:
              this.snackBar.open('Customer deleted.', 'Dismiss', { duration: 3000 });
              break;
          }
        })
      ),
    { dispatch: false }
  );

  persistCustomers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomerSuccess, updateCustomerSuccess, deleteCustomerSuccess),
        withLatestFrom(this.store.select(customersFeature.selectAll)),
        tap(([, customers]) => localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers)))
      ),
    { dispatch: false }
  );
}
