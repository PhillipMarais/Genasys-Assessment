import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs';
import { login } from '../../core/store/session.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [AsyncPipe, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly form = this.fb.nonNullable.group({ name: ['', [Validators.required, Validators.maxLength(50)]] });
  readonly greeting$ = this.form.controls.name.valueChanges.pipe(
    startWith(''),
    map((name) => name.trim() ? `Welcome, ${name.trim()}.` : '')
  );

  submit(): void {
    if (this.form.valid) this.store.dispatch(login({ name: this.form.getRawValue().name.trim() }));
  }
}
