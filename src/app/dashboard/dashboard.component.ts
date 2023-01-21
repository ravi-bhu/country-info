import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryListComponent } from '../country/country-list/country-list.component';
import { CountryService } from '../country/country.service';
import { CardComponent } from '../shared/ui/card/card.component';
import { DropdownComponent } from '../shared/ui/dropdown/dropdown.component';
import { SearchComponent } from '../shared/ui/search/search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    DropdownComponent,
    CardComponent,
    CountryListComponent,
  ],
  template: `
    <div class="container">
      <section class="filter">
        <app-search (searchTerm)="onCountrySearch($event)"></app-search>
        <app-dropdown (regionFilter)="onRegionFilter($event)"></app-dropdown>
      </section>
      <app-country-list
        [countries]="(countries$ | async) ?? []"
      ></app-country-list>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 4rem;
      }

      .filter {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
      }

      app-search {
        width: 20rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  countries$ = this.countryService.allCountries$;

  constructor(private countryService: CountryService) {}

  onCountrySearch(country: string) {
    if (country) {
      this.countries$ = this.countryService.searchCountriesByName(country);
    } else {
      this.countries$ = this.countryService.allCountries$;
    }
  }

  onRegionFilter(region: string) {
    if (region) {
      this.countries$ = this.countryService.getCountriesByRegion(region);
    } else {
      this.countries$ = this.countryService.allCountries$;
    }
  }
}
