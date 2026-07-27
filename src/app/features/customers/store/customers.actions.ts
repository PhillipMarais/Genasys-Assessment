import { createAction, props } from '@ngrx/store';
import { Customer } from '../../../core/models/customer.model';

export const addCustomer = createAction('[Customers] Add Customer', props<{ customer: Customer }>());
export const addCustomerSuccess = createAction('[Customers] Add Customer Success', props<{ customer: Customer }>());

export const updateCustomer = createAction('[Customers] Update Customer', props<{ customer: Customer }>());
export const updateCustomerSuccess = createAction('[Customers] Update Customer Success', props<{ customer: Customer }>());

export const deleteCustomer = createAction('[Customers] Delete Customer', props<{ id: string }>());
export const deleteCustomerSuccess = createAction('[Customers] Delete Customer Success', props<{ id: string }>());
