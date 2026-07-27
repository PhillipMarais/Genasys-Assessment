import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Country, CountryApiEntry } from '../../../core/models/enrichment.model';

const COUNTRIES_URL = 'https://countries.dev/countries?fields=name,flag,flags,alpha2Code';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  private readonly countries$: Observable<Country[]> = this.http.get<CountryApiEntry[]>(COUNTRIES_URL).pipe(
    map((entries) => entries.map((entry) => ({ code: entry.alpha2Code, name: entry.name, flag: entry.flag }))),
    catchError((error) => {
      console.error('Failed to load country list', error);
      return of<Country[]>([]);
    }),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }
}
