import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { NationalizeApiResponse } from '../../../core/models/enrichment.model';

export interface NationalizeResult {
  predictions: { countryCode: string; probability: number }[];
  rateLimited: boolean;
}

const NATIONALIZE_URL = 'https://api.nationalize.io';

@Injectable({ providedIn: 'root' })
export class NationalizeService {
  private readonly http = inject(HttpClient);

  predict(name: string): Observable<NationalizeResult> {
    return this.http.get<NationalizeApiResponse>(NATIONALIZE_URL, { params: { name } }).pipe(
      map((response) => ({
        predictions: response.country.map((c) => ({ countryCode: c.country_id, probability: c.probability })),
        rateLimited: false
      })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
          return of({ predictions: [], rateLimited: true });
        }
        console.warn('Nationalize lookup failed', error);
        return of({ predictions: [], rateLimited: false });
      })
    );
  }
}
