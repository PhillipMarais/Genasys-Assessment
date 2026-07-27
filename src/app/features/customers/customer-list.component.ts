import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { Customer } from '../../core/models/customer.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { deleteCustomer } from './store/customers.actions';
import { customersFeature } from './store/customers.reducer';

@Component({
  standalone: true,
  selector: 'app-customer-list',
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatTooltipModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly columns = ['name', 'address', 'university', 'actions'];
  readonly dataSource = new MatTableDataSource<Customer>([]);
  readonly trackById = (_: number, customer: Customer): string => customer.id;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource.sortingDataAccessor = (customer, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'name':
          return `${customer.firstName} ${customer.lastName}`.toLowerCase();
        default:
          return (customer as unknown as Record<string, string | number>)[sortHeaderId];
      }
    };

    this.store
      .select(customersFeature.selectAll)
      .pipe(takeUntilDestroyed())
      .subscribe((customers) => (this.dataSource.data = customers));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  addCustomer(): void {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/customers', customer.id, 'edit']);
  }

  deleteCustomer(customer: Customer): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Delete customer',
          message: `Delete ${customer.firstName} ${customer.lastName}? Their quotes will be removed too. This can't be undone.`
        }
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.store.dispatch(deleteCustomer({ id: customer.id })));
  }

  viewQuotes(customer: Customer): void {
    this.router.navigate(['/quotes'], { queryParams: { customerId: customer.id } });
  }
}
