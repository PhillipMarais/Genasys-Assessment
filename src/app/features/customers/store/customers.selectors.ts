import { createSelector } from '@ngrx/store';
import { customersFeature } from './customers.reducer';

export const selectCustomerById = (id: string) =>
  createSelector(customersFeature.selectEntities, (entities) => entities[id]);
