import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address, Customer, University } from '../../core/models/customer.model';
import { EnrichmentPanelComponent } from './enrichment/enrichment-panel.component';
import { addCustomer, updateCustomer } from './store/customers.actions';
import { selectCustomerById } from './store/customers.selectors';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    EnrichmentPanelComponent
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly customerId = this.route.snapshot.paramMap.get('id');
  readonly isEdit = !!this.customerId;

  private readonly existingCustomer = this.customerId
    ? toSignal(this.store.select(selectCustomerById(this.customerId)), { initialValue: undefined })
    : undefined;

  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    addresses: this.fb.array([this.createAddressGroup()]),
    countryCode: this.fb.control<string | null>(null),
    university: this.fb.control<University | null>(null)
  });

  constructor() {
    if (this.customerId) {
      const customer = this.existingCustomer?.();
      if (customer) this.patchForm(customer);
    }
  }

  get addresses() {
    return this.form.controls.addresses;
  }

  private createAddressGroup(address?: Address) {
    return this.fb.nonNullable.group({
      street: [address?.street ?? '', Validators.required],
      city: [address?.city ?? '', Validators.required],
      suburb: [address?.suburb ?? '', Validators.required],
      postalCode: [address?.postalCode ?? '', Validators.required]
    });
  }

  private patchForm(customer: Customer): void {
    this.form.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      countryCode: customer.countryCode ?? null,
      university: customer.university ?? null
    });

    this.addresses.clear();
    (customer.addresses.length ? customer.addresses : [undefined]).forEach((address) => this.addresses.push(this.createAddressGroup(address)));
  }

  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) this.addresses.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const customer: Customer = {
      id: this.customerId ?? crypto.randomUUID(),
      firstName: value.firstName,
      lastName: value.lastName,
      addresses: value.addresses,
      countryCode: value.countryCode ?? undefined,
      university: value.university ?? undefined
    };

    this.store.dispatch(this.isEdit ? updateCustomer({ customer }) : addCustomer({ customer }));
  }

  cancel(): void {
    this.router.navigateByUrl('/customers');
  }
}
