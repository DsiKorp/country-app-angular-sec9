import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";

@Component({
  selector: 'country-page',
  imports: [NotFound],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryService = inject(CountryService);

  // ActivatedRoute tiene la información de la ruta activa, es decir,
  // la ruta que se está mostrando en el navegador.
  // Con ella podemos acceder a los parámetros de la ruta, como el código del
  // país que queremos mostrar.
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  //countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    // return implicito de un observable, no es necesario usar return ni llaves.
    stream: ({ params }) => this.countryService.searchCountryByAlphaCode(params.code),
  });

}
