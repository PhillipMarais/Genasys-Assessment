import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Customer } from '../../../core/models/customer.model';
import { DEMO_CUSTOMERS } from '../../../core/models/demo-data';
import { addCustomerSuccess, deleteCustomerSuccess, updateCustomerSuccess } from './customers.actions';

export const CUSTOMERS_STORAGE_KEY = 'genasys-customers';

export type CustomersState = EntityState<Customer>;

export const customersAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

function loadPersistedCustomers(): Customer[] | null {
  try {
    const raw = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Customer[]) : null;
  } catch {
    return null;
  }
}

const initialState: CustomersState = customersAdapter.setAll(
  loadPersistedCustomers() ?? DEMO_CUSTOMERS,
  customersAdapter.getInitialState()
);

export const customersFeature = createFeature({
  name: 'customers',
  reducer: createReducer(
    initialState,
    on(addCustomerSuccess, (state, { customer }) => customersAdapter.addOne(customer, state)),
    on(updateCustomerSuccess, (state, { customer }) => customersAdapter.setOne(customer, state)),
    on(deleteCustomerSuccess, (state, { id }) => customersAdapter.removeOne(id, state))
  ),
  extraSelectors: ({ selectCustomersState }) => customersAdapter.getSelectors(selectCustomersState)
});
