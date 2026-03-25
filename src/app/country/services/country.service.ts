import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, delay } from 'rxjs';

import type { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();
    //console.log('Searching for capital:', query);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        //delay(3000),
        catchError((error) => {
          //console.log(error);
          return throwError(() => new Error(`Capital "${query}" not found!`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();
    //console.log('Searching for country:', query);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        //delay(3000),
        catchError((error) => {
          //console.log(error);
          return throwError(() => new Error(`Country "${query}" not found!`));
        })
      );
  }

}
