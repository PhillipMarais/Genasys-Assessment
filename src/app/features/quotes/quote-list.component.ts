import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { Customer } from '../../core/models/customer.model';
import { Quote, QuoteStatus } from '../../core/models/quote.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { customersFeature } from '../customers/store/customers.reducer';
import { QuoteFormDialogComponent } from './quote-form-dialog.component';
import { addQuote, deleteQuote, updateQuote } from './store/quotes.actions';
import { quotesFeature } from './store/quotes.reducer';

@Component({
  standalone: true,
  selector: 'app-quote-list',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule
  ],
  // Without this, mat-stepper ignores custom `state`/`matStepperIcon` overrides entirely and
  // always renders its own numbered circle, so our colored status icons never appear.
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } }],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  readonly columns = ['id', 'customer', 'amount', 'status', 'date', 'actions'];
  readonly dataSource = new MatTableDataSource<Quote>([]);
  readonly trackById = (_: number, quote: Quote): string => quote.id;
  readonly customers = toSignal(this.store.select(customersFeature.selectAll), { initialValue: [] as Customer[] });

  private allQuotes: Quote[] = [];
  private searchTerm = '';
  statusFilter: QuoteStatus | null = null;
  customerFilter: string | null = null;
  dateRangeStart: Date | null = null;
  dateRangeEnd: Date | null = null;

  // Order must match the declaration order of the <mat-step> elements in the template.
  private readonly statusStepOrder: QuoteStatus[] = ['Sent', 'Draft', 'Declined', 'Accepted'];

  constructor() {
    this.dataSource.sortingDataAccessor = (quote, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'customer':
          return quote.customerFullName.toLowerCase();
        case 'date':
          return quote.createdDate;
        default:
          return (quote as unknown as Record<string, string | number>)[sortHeaderId];
      }
    };

    this.store
      .select(quotesFeature.selectAll)
      .pipe(takeUntilDestroyed())
      .subscribe((quotes) => {
        this.allQuotes = quotes;
        this.applyFilters();
      });

    // Arriving from a customer's "View quotes" link pre-selects them in the customer filter
    // dropdown above, rather than restricting the underlying quote list at the source.
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('customerId')),
        takeUntilDestroyed()
      )
      .subscribe((customerId) => {
        this.customerFilter = customerId;
        this.applyFilters();
      });
  }

  // Setter-based ViewChilds: our data arrives synchronously from the store, and MatPaginator's
  // own `initialized` event can fire before ngAfterViewInit gets a chance to attach it — that
  // one-time event is then missed and the paginator shows "0 of 0" without ever slicing rows.
  // A setter re-wires the dataSource the moment Angular resolves the query, avoiding the race.
  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    if (sort) this.dataSource.sort = sort;
  }

  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    if (paginator) this.dataSource.paginator = paginator;
  }

  filter(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilters();
  }

  toggleStatusFilter(status: QuoteStatus): void {
    this.statusFilter = this.statusFilter === status ? null : status;
    this.applyFilters();
  }

  onCustomerFilterChange(customerId: string | null): void {
    this.customerFilter = customerId;
    this.applyFilters();
  }

  onStartDateChange(date: Date | null): void {
    this.dateRangeStart = date;
    this.applyFilters();
  }

  onEndDateChange(date: Date | null): void {
    this.dateRangeEnd = date;
    this.applyFilters();
  }

  clearDateRange(): void {
    this.dateRangeStart = null;
    this.dateRangeEnd = null;
    this.applyFilters();
  }

  // Delegated click handler: a step's clickable header area is larger than the icon/label spans
  // we own, so we resolve the status from whichever header the click landed in, covering the
  // whole header (not just the icon/text) in one place instead of per-element handlers.
  onStepperClick(event: MouseEvent): void {
    const header = (event.target as HTMLElement).closest('.mat-step-header');
    if (!header) return;

    const stepperEl = event.currentTarget as HTMLElement;
    const headers = Array.from(stepperEl.querySelectorAll('.mat-step-header'));
    const status = this.statusStepOrder[headers.indexOf(header)];
    if (status) this.toggleStatusFilter(status);
  }

  private toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private applyFilters(): void {
    this.dataSource.data = this.allQuotes.filter((quote) => {
      const matchesStatus = !this.statusFilter || quote.status === this.statusFilter;
      const matchesCustomer = !this.customerFilter || quote.customerId === this.customerFilter;
      const matchesSearch = !this.searchTerm || `${quote.customerFullName} ${quote.status}`.toLowerCase().includes(this.searchTerm);
      const matchesDateRange =
        !this.dateRangeStart ||
        (quote.createdDate >= this.toDateKey(this.dateRangeStart) &&
          quote.createdDate <= this.toDateKey(this.dateRangeEnd ?? this.dateRangeStart));
      return matchesStatus && matchesCustomer && matchesSearch && matchesDateRange;
    });
  }

  addQuote(): void {
    this.dialog
      .open(QuoteFormDialogComponent, { data: { quote: null, presetCustomerId: this.customerFilter }, width: '480px' })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((quote: Quote) => this.store.dispatch(addQuote({ quote })));
  }

  editQuote(quote: Quote): void {
    this.dialog
      .open(QuoteFormDialogComponent, { data: { quote, presetCustomerId: null }, width: '480px' })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((updated: Quote) => this.store.dispatch(updateQuote({ quote: updated })));
  }

  deleteQuote(quote: Quote): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Delete quote', message: `Delete quote ${quote.id} for ${quote.customerFullName}? This can't be undone.` }
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.store.dispatch(deleteQuote({ id: quote.id })));
  }
}
