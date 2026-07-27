import { createAction, props } from '@ngrx/store';
import { Quote } from '../../../core/models/quote.model';

export const addQuote = createAction('[Quotes] Add Quote', props<{ quote: Quote }>());
export const addQuoteSuccess = createAction('[Quotes] Add Quote Success', props<{ quote: Quote }>());

export const updateQuote = createAction('[Quotes] Update Quote', props<{ quote: Quote }>());
export const updateQuoteSuccess = createAction('[Quotes] Update Quote Success', props<{ quote: Quote }>());

export const deleteQuote = createAction('[Quotes] Delete Quote', props<{ id: string }>());
export const deleteQuoteSuccess = createAction('[Quotes] Delete Quote Success', props<{ id: string }>());

export const deleteQuotesByCustomer = createAction('[Quotes] Delete Quotes By Customer', props<{ customerId: string }>());
