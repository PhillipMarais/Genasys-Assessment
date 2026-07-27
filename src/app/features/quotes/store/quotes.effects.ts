import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import {
  addQuote,
  addQuoteSuccess,
  deleteQuote,
  deleteQuoteSuccess,
  deleteQuotesByCustomer,
  updateQuote,
  updateQuoteSuccess
} from './quotes.actions';
import { QUOTES_STORAGE_KEY, quotesFeature } from './quotes.reducer';

const SIMULATED_LATENCY_MS = 150;

@Injectable()
export class QuotesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);

  addQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addQuote),
      switchMap(({ quote }) => of(quote).pipe(delay(SIMULATED_LATENCY_MS), map((q) => addQuoteSuccess({ quote: q }))))
    )
  );

  updateQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateQuote),
      switchMap(({ quote }) => of(quote).pipe(delay(SIMULATED_LATENCY_MS), map((q) => updateQuoteSuccess({ quote: q }))))
    )
  );

  deleteQuote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteQuote),
      switchMap(({ id }) => of(id).pipe(delay(SIMULATED_LATENCY_MS), map((deletedId) => deleteQuoteSuccess({ id: deletedId }))))
    )
  );

  notifyOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addQuoteSuccess, updateQuoteSuccess, deleteQuoteSuccess),
        tap((action) => {
          switch (action.type) {
            case addQuoteSuccess.type:
              this.snackBar.open('Quote added.', 'Dismiss', { duration: 3000 });
              break;
            case updateQuoteSuccess.type:
              this.snackBar.open('Quote updated.', 'Dismiss', { duration: 3000 });
              break;
            case deleteQuoteSuccess.type:
              this.snackBar.open('Quote deleted.', 'Dismiss', { duration: 3000 });
              break;
          }
        })
      ),
    { dispatch: false }
  );

  persistQuotes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addQuoteSuccess, updateQuoteSuccess, deleteQuoteSuccess, deleteQuotesByCustomer),
        withLatestFrom(this.store.select(quotesFeature.selectAll)),
        tap(([, quotes]) => localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes)))
      ),
    { dispatch: false }
  );
}
