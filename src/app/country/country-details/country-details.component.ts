import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="country-details" *ngIf="country$ | async as country">
      <button class="back-btn" routerLink="/">
        <span class="icon icon--back"></span>
        Back
      </button>
      <div class="detail">
        <img [src]="country.flag" [alt]="country.name" />
        <article>
          <h2>{{ country.name }}</h2>
          <div class="basic">
            <section class="basic-info">
              <p>
                <span class="info-title">Native Name:</span>
                {{ country.nativeName }}
              </p>
              <p>
                <span class="info-title">Population:</span>
                {{ country.population }}
              </p>
              <p>
                <span class="info-title">Region:</span>
                {{ country.region }}
              </p>
              <p>
                <span class="info-title">Sub Region:</span>
                {{ country.subregion }}
              </p>
              <p>
                <span class="info-title">Capital:</span>
                {{ country.capital }}
              </p>
            </section>
            <section>
              <p>
                <span class="info-title">Top Level Domain:</span>
                {{ country.topLevelDomain }}
              </p>
              <p>
                <span class="info-title">Currencies:</span>
                {{ country.currencies }}
              </p>
              <p>
                <span class="info-title">Languages:</span>
                {{ country.languages }}
              </p>
            </section>
          </div>
          <div>
            <div class="border-countries">
              <p class="info-title">Border Countries:</p>
              <span>
                <button
                  *ngFor="let countryId of country.borders"
                  [routerLink]="['/', countryId]"
                >
                  {{ countryId }}
                </button>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <ng-template #notFound></ng-template>
  `,
  styles: [
    `
      .country-details {
        display: flex;
        flex-direction: column;
        margin: 2rem;
      }

      .back-btn {
        margin-bottom: 2rem;
      }

      .basic-info {
        margin-bottom: 2.5rem;
      }

      .info-title {
        font-weight: 600;
      }

      button {
        background-color: var(--clr-primary);
        border: none;
        color: var(--clr-text);
        width: fit-content;
        padding: 0.5rem 1rem;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 300;
        border-radius: 0.3rem;
      }

      .icon--back {
        mask: url('/assets/icons/arrow-left.svg');
        mask-repeat: no-repeat;
        padding-inline: 0.3rem;
        width: 1rem;
        height: 1rem;
      }

      img {
        max-width: 20rem;
      }

      .border-countries > span {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .info-title {
        margin: 0;
        padding-top: 0.5rem;
      }

      @media screen and (width > 375px) {
        .country-details {
          margin: 3rem;
        }

        .back-btn {
          margin-bottom: 3rem;
        }
        .detail {
          display: flex;
          align-items: center;
          gap: 8rem;
        }
        img {
          max-width: 40rem;
        }
        .basic {
          display: flex;
          gap: 5rem;
        }
        .border-countries {
          display: flex;
          gap: 1rem;
          white-space: nowrap;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent {
  country$ = this.activatedRoute.params.pipe(
    map((params) => params['country']),
    mergeMap((country) => this.countryService.getCountryDetails(country))
    // shareReplay(1)
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) {}

  getCountryName(id: string) {
    return this.countryService.getCountryName(id);
  }
}
