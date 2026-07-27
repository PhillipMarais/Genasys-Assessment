import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Quote } from '../../../core/models/quote.model';
import { DEMO_QUOTES } from '../../../core/models/demo-data';
import { addQuoteSuccess, deleteQuoteSuccess, deleteQuotesByCustomer, updateQuoteSuccess } from './quotes.actions';

export const QUOTES_STORAGE_KEY = 'genasys-quotes';

export type QuotesState = EntityState<Quote>;

export const quotesAdapter: EntityAdapter<Quote> = createEntityAdapter<Quote>();

function loadPersistedQuotes(): Quote[] | null {
  try {
    const raw = localStorage.getItem(QUOTES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Quote[]) : null;
  } catch {
    return null;
  }
}

const initialState: QuotesState = quotesAdapter.setAll(
  loadPersistedQuotes() ?? DEMO_QUOTES,
  quotesAdapter.getInitialState()
);

export const quotesFeature = createFeature({
  name: 'quotes',
  reducer: createReducer(
    initialState,
    on(addQuoteSuccess, (state, { quote }) => quotesAdapter.addOne(quote, state)),
    on(updateQuoteSuccess, (state, { quote }) => quotesAdapter.setOne(quote, state)),
    on(deleteQuoteSuccess, (state, { id }) => quotesAdapter.removeOne(id, state)),
    on(deleteQuotesByCustomer, (state, { customerId }) =>
      quotesAdapter.removeMany(
        Object.values(state.entities)
          .filter((quote): quote is Quote => quote?.customerId === customerId)
          .map((quote) => quote.id),
        state
      )
    )
  ),
  extraSelectors: ({ selectQuotesState }) => quotesAdapter.getSelectors(selectQuotesState)
});
