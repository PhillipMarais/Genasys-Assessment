import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs';
import { Quote } from '../../core/models/quote.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { QuoteFormDialogComponent } from './quote-form-dialog.component';
import { addQuote, deleteQuote, updateQuote } from './store/quotes.actions';
import { selectQuotesByCustomerId } from './store/quotes.selectors';

@Component({
  standalone: true,
  selector: 'app-quote-list',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.scss'
})
export class QuoteListComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  readonly columns = ['id', 'customer', 'amount', 'status', 'date', 'actions'];
  readonly dataSource = new MatTableDataSource<Quote>([]);
  readonly trackById = (_: number, quote: Quote): string => quote.id;
  selectedCustomerId: string | null = null;

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

    this.route.queryParamMap
      .pipe(
        map((params) => params.get('customerId')),
        tap((customerId) => (this.selectedCustomerId = customerId)),
        switchMap((customerId) => this.store.select(selectQuotesByCustomerId(customerId))),
        takeUntilDestroyed()
      )
      .subscribe((quotes) => (this.dataSource.data = quotes));
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  addQuote(): void {
    this.dialog
      .open(QuoteFormDialogComponent, { data: { quote: null, presetCustomerId: this.selectedCustomerId }, width: '480px' })
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
