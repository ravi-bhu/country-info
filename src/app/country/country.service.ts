import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, filter, map, Observable, Subscription, tap } from 'rxjs';
import { Country, CountrySummary } from './country';
import {
  toCountriesSummariesOrderedByName,
  toCountryDetails,
} from './country.util';

const API_URL = 'https://restcountries.com/v3.1/';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private subscription = new Subscription();

  constructor(private httpClient: HttpClient) {}

  get allCountries$(): Observable<CountrySummary[]> {
    return this.httpClient
      .get<CountrySummary[]>(
        `${API_URL}/all?fields=cca3,name,population,region,capital,flags`
      )
      .pipe(map(toCountriesSummariesOrderedByName));
  }

  searchCountriesByName(name: string): Observable<CountrySummary[]> {
    return this.httpClient
      .get<CountrySummary[]>(`${API_URL}/name/${name}`)
      .pipe(debounceTime(500), map(toCountriesSummariesOrderedByName));
  }

  getCountriesByRegion(region: string): Observable<CountrySummary[]> {
    return this.httpClient
      .get<CountrySummary[]>(`${API_URL}/region/${region}`)
      .pipe(map(toCountriesSummariesOrderedByName));
  }

  getCountryDetails(id: string): Observable<Country> {
    return this.httpClient
      .get<any>(`${API_URL}/alpha/${id}`)
      .pipe(map((countries) => toCountryDetails(countries[0])));
  }

  getCountryName(id: string) {
    let countryName = '';
    const sub = this.httpClient
      .get<any>(`${API_URL}/alpha/${id}?fields=name`)
      .pipe(
        map((countries) => countries[0]?.name?.common),
        filter(Boolean),
        tap((name) => (countryName = name))
      )
      .subscribe();
    this.subscription.add(sub);
    console.log(countryName);
    return countryName;
  }
}
