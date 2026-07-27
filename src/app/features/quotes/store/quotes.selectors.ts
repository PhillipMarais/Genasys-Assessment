import { createSelector } from '@ngrx/store';
import { quotesFeature } from './quotes.reducer';

export const selectQuotesByCustomerId = (customerId: string | null) =>
  createSelector(quotesFeature.selectAll, (quotes) =>
    customerId ? quotes.filter((quote) => quote.customerId === customerId) : quotes
  );
