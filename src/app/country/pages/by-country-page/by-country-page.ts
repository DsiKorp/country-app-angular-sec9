import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryList } from '../../components/country-list/country-list';


@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    // En Angular 21, rxResource ya no recibe request/loader, sino params/stream.
    params: () => ({ query: this.query() }),
    //defaultValue: [] as Country[],
    // El stream se ejecuta cada vez que cambian los params, y debe retornar un Observable con los datos.
    // En este caso, cada vez que cambie la query, se hará una nueva búsqueda por capital.
    // Si la query está vacía, retornamos un Observable de array vacío para evitar hacer una petición innecesaria.
    // request por params en Angular 20: ({ request }) => {
    //   if (!request) return of([]);
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query);
    },
  });



  // onSearch(value: string): void {
  //   console.log('Search button clicked', value);
  // }
}
