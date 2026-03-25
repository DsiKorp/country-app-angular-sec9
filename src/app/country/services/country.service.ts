import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


import { map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountries(resp)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`Error fetching countries for capital: ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string) {
    const url = `${API_URL}/name/${query}`;

    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountries(resp)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`Error fetching countries for name: ${query}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountries(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`Error fetching country for alpha code: ${code}`)
        );
      })
    );
  }
}
