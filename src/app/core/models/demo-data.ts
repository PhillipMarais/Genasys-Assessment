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
  },
  {
    id: 'c-1004',
    firstName: 'Sipho',
    lastName: 'Khumalo',
    countryCode: 'ZA',
    addresses: [
      { street: '4 Main Road', city: 'Cape Town', suburb: 'Sea Point', postalCode: '8005' },
      { street: '6 Bird Street', city: 'Polokwane', suburb: 'Bendor', postalCode: '0699' }
    ]
  },
  {
    id: 'c-1005',
    firstName: 'Anele',
    lastName: 'Patel',
    countryCode: 'ZA',
    addresses: [
      { street: '11 Long Street', city: 'Johannesburg', suburb: 'Sandton', postalCode: '2196' }
    ]
  },
  {
    id: 'c-1006',
    firstName: 'Johan',
    lastName: 'Nkosi',
    countryCode: 'ZA',
    addresses: [
      { street: '18 Oak Avenue', city: 'Durban', suburb: 'Umhlanga', postalCode: '4319' }
    ]
  },
  {
    id: 'c-1007',
    firstName: 'Marí',
    lastName: 'Steyn',
    countryCode: 'DE',
    addresses: [
      { street: '25 Bird Street', city: 'Pretoria', suburb: 'Hatfield', postalCode: '0028' },
      { street: '39 Jan Smuts Avenue', city: 'George', suburb: 'Denneoord', postalCode: '6529' }
    ]
  },
  {
    id: 'c-1008',
    firstName: 'Fatima',
    lastName: 'Abrahams',
    countryCode: 'IN',
    addresses: [
      { street: '32 Loop Street', city: 'Port Elizabeth', suburb: 'Summerstrand', postalCode: '6001' }
    ]
  },
  {
    id: 'c-1009',
    firstName: 'Ahmed',
    lastName: 'Molefe',
    countryCode: 'SA',
    addresses: [
      { street: '39 Nelson Mandela Drive', city: 'Bloemfontein', suburb: 'Westdene', postalCode: '9301' }
    ]
  },
  {
    id: 'c-1010',
    firstName: 'Lindiwe',
    lastName: 'Fischer',
    countryCode: 'ZA',
    addresses: [
      { street: '46 Jan Smuts Avenue', city: 'East London', suburb: 'Vincent', postalCode: '5247' },
      { street: '72 5th Avenue', city: 'Paarl', suburb: 'Noorder-Paarl', postalCode: '7646' }
    ]
  },
  {
    id: 'c-1011',
    firstName: 'Pieter',
    lastName: 'Ibrahim',
    countryCode: 'FR',
    addresses: [
      { street: '53 Rivonia Road', city: 'Polokwane', suburb: 'Bendor', postalCode: '0699' }
    ]
  },
  {
    id: 'c-1012',
    firstName: 'Nomvula',
    lastName: 'Osei',
    countryCode: 'ZA',
    addresses: [
      { street: '60 Kloof Street', city: 'Nelspruit', suburb: 'West Acres', postalCode: '1200' }
    ]
  },
  {
    id: 'c-1013',
    firstName: 'Ben',
    lastName: 'Rossi',
    countryCode: 'NG',
    addresses: [
      { street: '67 5th Avenue', city: 'Kimberley', suburb: 'Hadison Park', postalCode: '8301' },
      { street: '105 Market Street', city: 'Johannesburg', suburb: 'Rosebank', postalCode: '2196' }
    ]
  },
  {
    id: 'c-1014',
    firstName: 'Aisha',
    lastName: 'Wang',
    countryCode: 'EG',
    addresses: [
      { street: '74 Beach Road', city: 'George', suburb: 'Denneoord', postalCode: '6529' }
    ]
  },
  {
    id: 'c-1015',
    firstName: 'Kwame',
    lastName: 'Tanaka',
    countryCode: 'GH',
    addresses: [
      { street: '81 Voortrekker Road', city: 'Rustenburg', suburb: 'Safarituine', postalCode: '0299' }
    ]
  },
  {
    id: 'c-1016',
    firstName: 'Elena',
    lastName: 'Bennett',
    countryCode: 'IT',
    addresses: [
      { street: '88 Market Street', city: 'Stellenbosch', suburb: 'Die Boord', postalCode: '7600' },
      { street: '138 Main Road', city: 'Midrand', suburb: 'Noordwyk', postalCode: '1687' }
    ]
  },
  {
    id: 'c-1017',
    firstName: 'Marco',
    lastName: 'Adebayo',
    countryCode: 'CN',
    addresses: [
      { street: '95 Baker Street', city: 'Paarl', suburb: 'Noorder-Paarl', postalCode: '7646' }
    ]
  },
  {
    id: 'c-1018',
    firstName: 'Chen',
    lastName: 'Reddy',
    countryCode: 'JP',
    addresses: [
      { street: '102 Church Street', city: 'Knysna', suburb: 'Leisure Isle', postalCode: '6570' }
    ]
  },
  {
    id: 'c-1019',
    firstName: 'Yuki',
    lastName: 'Zulu',
    countryCode: 'GB',
    addresses: [
      { street: '109 Main Road', city: 'Cape Town', suburb: 'Claremont', postalCode: '7708' },
      { street: '171 Bird Street', city: 'Durban', suburb: 'Umhlanga', postalCode: '4319' }
    ]
  },
  {
    id: 'c-1020',
    firstName: 'Oliver',
    lastName: 'Coetzee',
    countryCode: 'NG',
    addresses: [
      { street: '116 Long Street', city: 'Johannesburg', suburb: 'Rosebank', postalCode: '2196' }
    ]
  },
  {
    id: 'c-1021',
    firstName: 'Grace',
    lastName: 'Dlamini',
    countryCode: 'IN',
    addresses: [
      { street: '123 Oak Avenue', city: 'Durban', suburb: 'Berea', postalCode: '4001' }
    ]
  },
  {
    id: 'c-1022',
    firstName: 'Ravi',
    lastName: 'van Wyk',
    countryCode: 'ZA',
    addresses: [
      { street: '130 Bird Street', city: 'Pretoria', suburb: 'Brooklyn', postalCode: '0181' },
      { street: '5 Jan Smuts Avenue', city: 'Bloemfontein', suburb: 'Westdene', postalCode: '9301' }
    ]
  },
  {
    id: 'c-1023',
    firstName: 'Zanele',
    lastName: 'Botha',
    countryCode: 'ZA',
    addresses: [
      { street: '137 Loop Street', city: 'Midrand', suburb: 'Noordwyk', postalCode: '1687' }
    ]
  }
];

export const DEMO_QUOTES: Quote[] = [
  { id: 'q-2001', customerId: 'c-1001', customerFullName: 'Thandi Mokoena', amount: 12450, status: 'Sent', createdDate: '2026-07-20' },
  { id: 'q-2002', customerId: 'c-1002', customerFullName: 'Daniel Meyer', amount: 18750, status: 'Draft', createdDate: '2026-07-22' },
  { id: 'q-2003', customerId: 'c-1001', customerFullName: 'Thandi Mokoena', amount: 9400, status: 'Accepted', createdDate: '2026-07-24' },
  { id: 'q-2004', customerId: 'c-1004', customerFullName: 'Sipho Khumalo', amount: 3500, status: 'Draft', createdDate: '2026-01-02' },
  { id: 'q-2005', customerId: 'c-1004', customerFullName: 'Sipho Khumalo', amount: 3529, status: 'Sent', createdDate: '2026-04-04' },
  { id: 'q-2006', customerId: 'c-1005', customerFullName: 'Anele Patel', amount: 3513, status: 'Sent', createdDate: '2026-02-07' },
  { id: 'q-2007', customerId: 'c-1005', customerFullName: 'Anele Patel', amount: 3542, status: 'Accepted', createdDate: '2026-05-09' },
  { id: 'q-2008', customerId: 'c-1005', customerFullName: 'Anele Patel', amount: 3571, status: 'Declined', createdDate: '2026-01-11' },
  { id: 'q-2009', customerId: 'c-1006', customerFullName: 'Johan Nkosi', amount: 3526, status: 'Accepted', createdDate: '2026-03-12' },
  { id: 'q-2010', customerId: 'c-1006', customerFullName: 'Johan Nkosi', amount: 3555, status: 'Declined', createdDate: '2026-06-14' },
  { id: 'q-2011', customerId: 'c-1006', customerFullName: 'Johan Nkosi', amount: 3584, status: 'Draft', createdDate: '2026-02-16' },
  { id: 'q-2012', customerId: 'c-1006', customerFullName: 'Johan Nkosi', amount: 3613, status: 'Sent', createdDate: '2026-05-18' },
  { id: 'q-2013', customerId: 'c-1007', customerFullName: 'Marí Steyn', amount: 3539, status: 'Declined', createdDate: '2026-04-17' },
  { id: 'q-2014', customerId: 'c-1007', customerFullName: 'Marí Steyn', amount: 3568, status: 'Draft', createdDate: '2026-07-19' },
  { id: 'q-2015', customerId: 'c-1007', customerFullName: 'Marí Steyn', amount: 3597, status: 'Sent', createdDate: '2026-03-21' },
  { id: 'q-2016', customerId: 'c-1007', customerFullName: 'Marí Steyn', amount: 3626, status: 'Accepted', createdDate: '2026-06-23' },
  { id: 'q-2017', customerId: 'c-1007', customerFullName: 'Marí Steyn', amount: 3655, status: 'Declined', createdDate: '2026-02-25' },
  { id: 'q-2018', customerId: 'c-1008', customerFullName: 'Fatima Abrahams', amount: 3552, status: 'Draft', createdDate: '2026-05-22' },
  { id: 'q-2019', customerId: 'c-1008', customerFullName: 'Fatima Abrahams', amount: 3581, status: 'Sent', createdDate: '2026-01-24' },
  { id: 'q-2020', customerId: 'c-1008', customerFullName: 'Fatima Abrahams', amount: 3610, status: 'Accepted', createdDate: '2026-04-26' },
  { id: 'q-2021', customerId: 'c-1008', customerFullName: 'Fatima Abrahams', amount: 3639, status: 'Declined', createdDate: '2026-07-28' },
  { id: 'q-2022', customerId: 'c-1008', customerFullName: 'Fatima Abrahams', amount: 3668, status: 'Draft', createdDate: '2026-03-02' },
  { id: 'q-2023', customerId: 'c-1008', customerFullName: 'Fatima Abrahams', amount: 3697, status: 'Sent', createdDate: '2026-06-04' },
  { id: 'q-2024', customerId: 'c-1009', customerFullName: 'Ahmed Molefe', amount: 3565, status: 'Sent', createdDate: '2026-06-27' },
  { id: 'q-2025', customerId: 'c-1009', customerFullName: 'Ahmed Molefe', amount: 3594, status: 'Accepted', createdDate: '2026-02-01' },
  { id: 'q-2026', customerId: 'c-1010', customerFullName: 'Lindiwe Fischer', amount: 3578, status: 'Accepted', createdDate: '2026-07-04' },
  { id: 'q-2027', customerId: 'c-1010', customerFullName: 'Lindiwe Fischer', amount: 3607, status: 'Declined', createdDate: '2026-03-06' },
  { id: 'q-2028', customerId: 'c-1010', customerFullName: 'Lindiwe Fischer', amount: 3636, status: 'Draft', createdDate: '2026-06-08' },
  { id: 'q-2029', customerId: 'c-1011', customerFullName: 'Pieter Ibrahim', amount: 3591, status: 'Declined', createdDate: '2026-01-09' },
  { id: 'q-2030', customerId: 'c-1011', customerFullName: 'Pieter Ibrahim', amount: 3620, status: 'Draft', createdDate: '2026-04-11' },
  { id: 'q-2031', customerId: 'c-1011', customerFullName: 'Pieter Ibrahim', amount: 3649, status: 'Sent', createdDate: '2026-07-13' },
  { id: 'q-2032', customerId: 'c-1011', customerFullName: 'Pieter Ibrahim', amount: 3678, status: 'Accepted', createdDate: '2026-03-15' },
  { id: 'q-2033', customerId: 'c-1012', customerFullName: 'Nomvula Osei', amount: 3604, status: 'Draft', createdDate: '2026-02-14' },
  { id: 'q-2034', customerId: 'c-1012', customerFullName: 'Nomvula Osei', amount: 3633, status: 'Sent', createdDate: '2026-05-16' },
  { id: 'q-2035', customerId: 'c-1012', customerFullName: 'Nomvula Osei', amount: 3662, status: 'Accepted', createdDate: '2026-01-18' },
  { id: 'q-2036', customerId: 'c-1012', customerFullName: 'Nomvula Osei', amount: 3691, status: 'Declined', createdDate: '2026-04-20' },
  { id: 'q-2037', customerId: 'c-1012', customerFullName: 'Nomvula Osei', amount: 3720, status: 'Draft', createdDate: '2026-07-22' },
  { id: 'q-2038', customerId: 'c-1013', customerFullName: 'Ben Rossi', amount: 3617, status: 'Sent', createdDate: '2026-03-19' },
  { id: 'q-2039', customerId: 'c-1013', customerFullName: 'Ben Rossi', amount: 3646, status: 'Accepted', createdDate: '2026-06-21' },
  { id: 'q-2040', customerId: 'c-1013', customerFullName: 'Ben Rossi', amount: 3675, status: 'Declined', createdDate: '2026-02-23' },
  { id: 'q-2041', customerId: 'c-1013', customerFullName: 'Ben Rossi', amount: 3704, status: 'Draft', createdDate: '2026-05-25' },
  { id: 'q-2042', customerId: 'c-1013', customerFullName: 'Ben Rossi', amount: 3733, status: 'Sent', createdDate: '2026-01-27' },
  { id: 'q-2043', customerId: 'c-1013', customerFullName: 'Ben Rossi', amount: 3762, status: 'Accepted', createdDate: '2026-04-01' },
  { id: 'q-2044', customerId: 'c-1014', customerFullName: 'Aisha Wang', amount: 3630, status: 'Accepted', createdDate: '2026-04-24' },
  { id: 'q-2045', customerId: 'c-1014', customerFullName: 'Aisha Wang', amount: 3659, status: 'Declined', createdDate: '2026-07-26' },
  { id: 'q-2046', customerId: 'c-1015', customerFullName: 'Kwame Tanaka', amount: 3643, status: 'Declined', createdDate: '2026-05-01' },
  { id: 'q-2047', customerId: 'c-1015', customerFullName: 'Kwame Tanaka', amount: 3672, status: 'Draft', createdDate: '2026-01-03' },
  { id: 'q-2048', customerId: 'c-1015', customerFullName: 'Kwame Tanaka', amount: 3701, status: 'Sent', createdDate: '2026-04-05' },
  { id: 'q-2049', customerId: 'c-1016', customerFullName: 'Elena Bennett', amount: 3656, status: 'Draft', createdDate: '2026-06-06' },
  { id: 'q-2050', customerId: 'c-1016', customerFullName: 'Elena Bennett', amount: 3685, status: 'Sent', createdDate: '2026-02-08' },
  { id: 'q-2051', customerId: 'c-1016', customerFullName: 'Elena Bennett', amount: 3714, status: 'Accepted', createdDate: '2026-05-10' },
  { id: 'q-2052', customerId: 'c-1016', customerFullName: 'Elena Bennett', amount: 3743, status: 'Declined', createdDate: '2026-01-12' },
  { id: 'q-2053', customerId: 'c-1017', customerFullName: 'Marco Adebayo', amount: 3669, status: 'Sent', createdDate: '2026-07-11' },
  { id: 'q-2054', customerId: 'c-1017', customerFullName: 'Marco Adebayo', amount: 3698, status: 'Accepted', createdDate: '2026-03-13' },
  { id: 'q-2055', customerId: 'c-1017', customerFullName: 'Marco Adebayo', amount: 3727, status: 'Declined', createdDate: '2026-06-15' },
  { id: 'q-2056', customerId: 'c-1017', customerFullName: 'Marco Adebayo', amount: 3756, status: 'Draft', createdDate: '2026-02-17' },
  { id: 'q-2057', customerId: 'c-1017', customerFullName: 'Marco Adebayo', amount: 3785, status: 'Sent', createdDate: '2026-05-19' },
  { id: 'q-2058', customerId: 'c-1018', customerFullName: 'Chen Reddy', amount: 3682, status: 'Accepted', createdDate: '2026-01-16' },
  { id: 'q-2059', customerId: 'c-1018', customerFullName: 'Chen Reddy', amount: 3711, status: 'Declined', createdDate: '2026-04-18' },
  { id: 'q-2060', customerId: 'c-1018', customerFullName: 'Chen Reddy', amount: 3740, status: 'Draft', createdDate: '2026-07-20' },
  { id: 'q-2061', customerId: 'c-1018', customerFullName: 'Chen Reddy', amount: 3769, status: 'Sent', createdDate: '2026-03-22' },
  { id: 'q-2062', customerId: 'c-1018', customerFullName: 'Chen Reddy', amount: 3798, status: 'Accepted', createdDate: '2026-06-24' },
  { id: 'q-2063', customerId: 'c-1018', customerFullName: 'Chen Reddy', amount: 3827, status: 'Declined', createdDate: '2026-02-26' },
  { id: 'q-2064', customerId: 'c-1019', customerFullName: 'Yuki Zulu', amount: 3695, status: 'Declined', createdDate: '2026-02-21' },
  { id: 'q-2065', customerId: 'c-1019', customerFullName: 'Yuki Zulu', amount: 3724, status: 'Draft', createdDate: '2026-05-23' },
  { id: 'q-2066', customerId: 'c-1020', customerFullName: 'Oliver Coetzee', amount: 3708, status: 'Draft', createdDate: '2026-03-26' },
  { id: 'q-2067', customerId: 'c-1020', customerFullName: 'Oliver Coetzee', amount: 3737, status: 'Sent', createdDate: '2026-06-28' },
  { id: 'q-2068', customerId: 'c-1020', customerFullName: 'Oliver Coetzee', amount: 3766, status: 'Accepted', createdDate: '2026-02-02' },
  { id: 'q-2069', customerId: 'c-1021', customerFullName: 'Grace Dlamini', amount: 3721, status: 'Sent', createdDate: '2026-04-03' },
  { id: 'q-2070', customerId: 'c-1021', customerFullName: 'Grace Dlamini', amount: 3750, status: 'Accepted', createdDate: '2026-07-05' },
  { id: 'q-2071', customerId: 'c-1021', customerFullName: 'Grace Dlamini', amount: 3779, status: 'Declined', createdDate: '2026-03-07' },
  { id: 'q-2072', customerId: 'c-1021', customerFullName: 'Grace Dlamini', amount: 3808, status: 'Draft', createdDate: '2026-06-09' },
  { id: 'q-2073', customerId: 'c-1022', customerFullName: 'Ravi van Wyk', amount: 3734, status: 'Accepted', createdDate: '2026-05-08' },
  { id: 'q-2074', customerId: 'c-1022', customerFullName: 'Ravi van Wyk', amount: 3763, status: 'Declined', createdDate: '2026-01-10' },
  { id: 'q-2075', customerId: 'c-1022', customerFullName: 'Ravi van Wyk', amount: 3792, status: 'Draft', createdDate: '2026-04-12' },
  { id: 'q-2076', customerId: 'c-1022', customerFullName: 'Ravi van Wyk', amount: 3821, status: 'Sent', createdDate: '2026-07-14' },
  { id: 'q-2077', customerId: 'c-1022', customerFullName: 'Ravi van Wyk', amount: 3850, status: 'Accepted', createdDate: '2026-03-16' },
  { id: 'q-2078', customerId: 'c-1023', customerFullName: 'Zanele Botha', amount: 3747, status: 'Declined', createdDate: '2026-06-13' },
  { id: 'q-2079', customerId: 'c-1023', customerFullName: 'Zanele Botha', amount: 3776, status: 'Draft', createdDate: '2026-02-15' },
  { id: 'q-2080', customerId: 'c-1023', customerFullName: 'Zanele Botha', amount: 3805, status: 'Sent', createdDate: '2026-05-17' },
  { id: 'q-2081', customerId: 'c-1023', customerFullName: 'Zanele Botha', amount: 3834, status: 'Accepted', createdDate: '2026-01-19' },
  { id: 'q-2082', customerId: 'c-1023', customerFullName: 'Zanele Botha', amount: 3863, status: 'Declined', createdDate: '2026-04-21' },
  { id: 'q-2083', customerId: 'c-1023', customerFullName: 'Zanele Botha', amount: 3892, status: 'Draft', createdDate: '2026-07-23' }
];
