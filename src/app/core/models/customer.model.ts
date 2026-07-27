export interface Address {
  street: string;
  city: string;
  suburb: string;
  postalCode: string;
}

export interface University {
  name: string;
  website: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  countryCode?: string;
  university?: University;
}
