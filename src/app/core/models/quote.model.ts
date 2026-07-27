export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Declined';

export interface Quote {
  id: string;
  customerId: string;
  customerFullName: string;
  amount: number;
  status: QuoteStatus;
  createdDate: string;
}

export const QUOTE_STATUSES: QuoteStatus[] = ['Draft', 'Sent', 'Accepted', 'Declined'];
