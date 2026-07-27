import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UniversityApiEntry, UniversityResult } from '../../../core/models/enrichment.model';

const UNIVERSITIES_URL = 'http://universities.hipolabs.com/search';

@Injectable({ providedIn: 'root' })
export class UniversityService {
  private readonly http = inject(HttpClient);

  search(countryFullName: string, query: string): Observable<UniversityResult[]> {
    return this.http
      .get<UniversityApiEntry[]>(UNIVERSITIES_URL, { params: { country: countryFullName.toLowerCase(), name: query } })
      .pipe(
        map((entries) =>
          entries.map((entry) => ({
            name: entry.name,
            website: entry.web_pages[0] ?? (entry.domains[0] ? `https://${entry.domains[0]}` : '')
          }))
        ),
        catchError((error) => {
          console.warn('University search failed', error);
          return of<UniversityResult[]>([]);
        })
      );
  }
}
