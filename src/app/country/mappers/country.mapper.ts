import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      area: restCountry.area || 0,
      capital: restCountry.capital ? restCountry.capital.join(', ') : '',
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags?.svg || '',
      //name: restCountry.translations['spa']?.common ?? 'No spanish name',
      name: restCountry.name?.common || '',
      population: restCountry.population || 0,
      region: restCountry.region || '',
      subRegion: restCountry.subregion || '',
    };
  }

  static mapRestCountriesToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(CountryMapper.mapRestCountryToCountry);
  }

}
