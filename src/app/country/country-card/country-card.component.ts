import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../shared/ui/card/card.component';
import { CountrySummary } from '../country';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
  template: `
    <app-card [routerLink]="country.id">
      <img [src]="country.flag" [alt]="country.name" />
      <section class="summary">
        <h2>{{ country.name }}</h2>
        <p>Population: {{ country.population | number : '1.0' }}</p>
        <p>Region: {{ country.region }}</p>
        <p>Capital: {{ country.capital }}</p>
      </section>
    </app-card>
  `,
  styles: [
    `
      app-card {
        height: 25rem;
        width: 15rem;
        cursor: pointer;
      }

      img {
        width: 100%;
        height: 50%;
        object-fit: cover;
      }

      .summary {
        padding-inline: 2rem;
      }

      .summary p {
        margin: 0;
        line-height: 1.5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCardComponent {
  @Input() country!: CountrySummary;
}
