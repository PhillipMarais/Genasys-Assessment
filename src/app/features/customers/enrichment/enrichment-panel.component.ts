import { AsyncPipe, PercentPipe } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, combineLatest, debounceTime, distinctUntilChanged, map, of, startWith, switchMap, take, tap } from 'rxjs';
import { University } from '../../../core/models/customer.model';
import { Country, CountryPrediction } from '../../../core/models/enrichment.model';
import { CountryService } from '../services/country.service';
import { NationalizeService } from '../services/nationalize.service';
import { UniversityService } from '../services/university.service';

const MIN_SURNAME_LENGTH = 2;
const MIN_QUERY_LENGTH = 2;
const SURNAME_DEBOUNCE_MS = 500;
const UNIVERSITY_DEBOUNCE_MS = 400;
const MAX_PREDICTIONS = 5;

@Component({
  standalone: true,
  selector: 'app-enrichment-panel',
  imports: [
    AsyncPipe,
    PercentPipe,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './enrichment-panel.component.html',
  styleUrl: './enrichment-panel.component.scss'
})
export class EnrichmentPanelComponent implements OnInit {
  @Input({ required: true }) lastNameControl!: FormControl<string>;
  @Input({ required: true }) countryControl!: FormControl<string | null>;
  @Input({ required: true }) universityControl!: FormControl<University | null>;

  private readonly nationalizeService = inject(NationalizeService);
  private readonly countryService = inject(CountryService);
  private readonly universityService = inject(UniversityService);
  private readonly destroyRef = inject(DestroyRef);

  readonly countrySearch = new FormControl('', { nonNullable: true });
  readonly universityQuery = new FormControl('', { nonNullable: true });

  loadingPredictions = false;
  rateLimited = false;
  loadingUniversities = false;

  predictions$!: Observable<CountryPrediction[]>;
  manualCountryOptions$!: Observable<Country[]>;
  selectedCountry$!: Observable<Country | undefined>;
  universityResults$!: Observable<University[]>;

  ngOnInit(): void {
    const countries$ = this.countryService.getCountries();

    this.predictions$ = this.lastNameControl.valueChanges.pipe(
      startWith(this.lastNameControl.value),
      map((name) => (name ?? '').trim()),
      distinctUntilChanged(),
      debounceTime(SURNAME_DEBOUNCE_MS),
      tap(() => (this.rateLimited = false)),
      switchMap((surname) => {
        if (surname.length < MIN_SURNAME_LENGTH) {
          return of<CountryPrediction[]>([]);
        }
        this.loadingPredictions = true;
        return this.nationalizeService.predict(surname).pipe(
          switchMap((result) =>
            countries$.pipe(
              take(1),
              map((countries): CountryPrediction[] => {
                this.loadingPredictions = false;
                this.rateLimited = result.rateLimited;
                return result.predictions
                  .map((prediction) => {
                    const country = countries.find((c) => c.code === prediction.countryCode);
                    return country ? { ...country, probability: prediction.probability } : null;
                  })
                  .filter((prediction): prediction is CountryPrediction => !!prediction)
                  .sort((a, b) => b.probability - a.probability)
                  .slice(0, MAX_PREDICTIONS);
              })
            )
          )
        );
      }),
      takeUntilDestroyedCompat(this.destroyRef)
    );

    this.manualCountryOptions$ = combineLatest([this.countrySearch.valueChanges.pipe(startWith('')), countries$]).pipe(
      map(([search, countries]) => {
        const term = search.trim().toLowerCase();
        return term ? countries.filter((c) => c.name.toLowerCase().includes(term)) : countries;
      })
    );

    this.selectedCountry$ = combineLatest([this.countryControl.valueChanges.pipe(startWith(this.countryControl.value)), countries$]).pipe(
      map(([code, countries]) => countries.find((c) => c.code === code))
    );

    this.universityResults$ = combineLatest([
      this.countryControl.valueChanges.pipe(startWith(this.countryControl.value)),
      this.universityQuery.valueChanges.pipe(startWith(this.universityQuery.value), debounceTime(UNIVERSITY_DEBOUNCE_MS), distinctUntilChanged())
    ]).pipe(
      switchMap(([code, query]) => {
        if (!code || query.trim().length < MIN_QUERY_LENGTH) {
          return of<University[]>([]);
        }
        return countries$.pipe(
          take(1),
          switchMap((countries) => {
            const country = countries.find((c) => c.code === code);
            if (!country) return of<University[]>([]);
            this.loadingUniversities = true;
            return this.universityService.search(country.name, query.trim()).pipe(tap(() => (this.loadingUniversities = false)));
          })
        );
      })
    );
  }

  selectPrediction(change: MatChipListboxChange): void {
    const prediction = change.value as CountryPrediction | undefined;
    if (!prediction) return;
    this.applyCountry(prediction);
  }

  selectManualCountry(country: Country): void {
    this.applyCountry(country);
  }

  private applyCountry(country: Country): void {
    this.countryControl.setValue(country.code);
    this.countrySearch.setValue(country.name);
    if (this.universityControl.value) {
      this.universityControl.setValue(null);
      this.universityQuery.setValue('');
    }
  }

  selectUniversity(university: University): void {
    this.universityControl.setValue(university);
    this.universityQuery.setValue(university.name);
  }

  clearUniversity(): void {
    this.universityControl.setValue(null);
    this.universityQuery.setValue('');
  }
}

// Small local wrapper so this file only needs the one rxjs-interop import site.
import { takeUntilDestroyed as takeUntilDestroyedCompat } from '@angular/core/rxjs-interop';
