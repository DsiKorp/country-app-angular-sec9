import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
})
export class NotFound {
  location = inject(Location);
  errorMessage = input.required<string>();

  goBack() {
    this.location.back();
  }
}
