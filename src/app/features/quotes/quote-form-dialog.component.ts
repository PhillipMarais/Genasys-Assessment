import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Customer } from '../../core/models/customer.model';
import { QUOTE_STATUSES, Quote } from '../../core/models/quote.model';
import { customersFeature } from '../customers/store/customers.reducer';

export interface QuoteFormDialogData {
  quote: Quote | null;
  presetCustomerId: string | null;
}

@Component({
  standalone: true,
  selector: 'app-quote-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './quote-form-dialog.component.html',
  styleUrl: './quote-form-dialog.component.scss'
})
export class QuoteFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly dialogRef = inject(MatDialogRef<QuoteFormDialogComponent, Quote>);
  readonly data = inject<QuoteFormDialogData>(MAT_DIALOG_DATA);

  readonly statuses = QUOTE_STATUSES;
  readonly customers = toSignal(this.store.select(customersFeature.selectAll), { initialValue: [] as Customer[] });

  readonly isEdit = !!this.data.quote;
  readonly form = this.fb.nonNullable.group({
    customerId: [this.data.quote?.customerId ?? this.data.presetCustomerId ?? '', Validators.required],
    amount: [this.data.quote?.amount ?? null as number | null, [Validators.required, Validators.min(1)]],
    status: [this.data.quote?.status ?? 'Draft', Validators.required],
    createdDate: [this.data.quote?.createdDate ? new Date(this.data.quote.createdDate) : new Date(), Validators.required]
  });

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    const customer = this.customers().find((c) => c.id === value.customerId);
    if (!customer) return;

    const quote: Quote = {
      id: this.data.quote?.id ?? crypto.randomUUID(),
      customerId: value.customerId,
      customerFullName: `${customer.firstName} ${customer.lastName}`,
      amount: value.amount!,
      status: value.status as Quote['status'],
      createdDate: value.createdDate.toISOString().slice(0, 10)
    };

    this.dialogRef.close(quote);
  }
}
