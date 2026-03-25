import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
})
export class CountrySearchInput {

  // Search... default value for the placeholder
  placeholder = input<string>('Search...');
  value = output<string>();

}
