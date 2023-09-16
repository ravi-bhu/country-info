import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CountrySummary } from '../country';
import { CountryCardComponent } from '../country-card/country-card.component';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, CountryCardComponent],
  template: `
    <app-country-card
      *ngFor="let country of countries"
      [country]="country"
    ></app-country-card>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        grid-gap: 2rem 1.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  @Input() countries: CountrySummary[] = [];
}
