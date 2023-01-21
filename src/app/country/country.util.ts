import { Country, CountrySummary } from './country';

export const toCountriesSummariesOrderedByName = (
  response: any[]
): CountrySummary[] => {
  return response.map(toCountrySummary).sort(byCountryName);
};

const toCountrySummary = (country: any): CountrySummary => {
  return {
    id: country.cca3,
    name: country.name.common,
    population: country.population,
    region: country.region,
    capital: country.capital[0],
    flag: country.flags.svg,
  };
};

const byCountryName = (c1: CountrySummary, c2: CountrySummary) =>
  c1.name.localeCompare(c2.name);

const getNativeName = (country: any): string => {
  const nativeName = country.name.nativeName;
  // @ts-ignore
  return Object.values(nativeName)[0].common ?? '';
};
export const toCountryDetails = (country: any): Country => {
  return {
    id: country.cca3,
    name: country.name.common,
    population: country.population,
    region: country.region,
    capital: country.capital[0],
    flag: country.flags.svg,
    nativeName: getNativeName(country),
    subregion: country.subregion,
    topLevelDomain: country.tld.join(', '),
    currencies: '',
    languages: '',
    borders: country.borders,
  };
};
