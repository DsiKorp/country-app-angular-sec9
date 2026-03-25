import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-capital-page.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    // En Angular 21, rxResource ya no recibe request/loader, sino params/stream.
    params: () => ({ query: this.query() }),
    defaultValue: [] as Country[],
    // El stream se ejecuta cada vez que cambian los params, y debe retornar un Observable con los datos.
    // En este caso, cada vez que cambie la query, se hará una nueva búsqueda por capital.
    // Si la query está vacía, retornamos un Observable de array vacío para evitar hacer una petición innecesaria.
    // request por params en Angular 20: ({ request }) => {
    //   if (!request) return of([]);
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCapital(params.query);
    },
  });


  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);


  // onSearch(query: string) {
  //   if (this.isLoading()) return; // Evitar múltiples búsquedas simultáneas

  //   //console.log('Search button clicked', query);
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //       console.log(countries)
  //     },
  //     error: (err) => {
  //       //console.log(err);
  //       this.isError.set(err);
  //       this.countries.set([]);
  //       this.isLoading.set(false);
  //     }
  //   });
  // }
}
