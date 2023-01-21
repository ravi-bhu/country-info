export interface CountrySummary {
  id: string;
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

export interface Country extends CountrySummary {
  nativeName: string;
  subregion: string;
  topLevelDomain: string;
  currencies: string;
  languages: string;
  borders: string[];
}
