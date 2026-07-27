import { Customer } from './customer.model';
import { Quote } from './quote.model';

export const DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'c-1001',
    firstName: 'Thandi',
    lastName: 'Mokoena',
    countryCode: 'ZA',
    addresses: [
      { street: '12 Kloof Street', city: 'Cape Town', suburb: 'Gardens', postalCode: '8001' }
    ]
  },
  {
    id: 'c-1002',
    firstName: 'Daniel',
    lastName: 'Meyer',
    countryCode: 'DE',
    addresses: [
      { street: '45 Voortrekker Road', city: 'Stellenbosch', suburb: 'Techno Park', postalCode: '7600' }
    ]
  },
  {
    id: 'c-1003',
    firstName: 'Priya',
    lastName: 'Naidoo',
    countryCode: 'IN',
    addresses: [
      { street: '8 Marine Parade', city: 'Durban', suburb: 'Point', postalCode: '4001' },
      { street: '3 Church Street', city: 'Pietermaritzburg', suburb: 'Scottsville', postalCode: '3201' }
    ]
  }
];

export const DEMO_QUOTES: Quote[] = [
  { id: 'q-2001', customerId: 'c-1001', customerFullName: 'Thandi Mokoena', amount: 12450, status: 'Sent', createdDate: '2026-07-20' },
  { id: 'q-2002', customerId: 'c-1002', customerFullName: 'Daniel Meyer', amount: 18750, status: 'Draft', createdDate: '2026-07-22' },
  { id: 'q-2003', customerId: 'c-1001', customerFullName: 'Thandi Mokoena', amount: 9400, status: 'Accepted', createdDate: '2026-07-24' }
];
