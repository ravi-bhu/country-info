import { Routes } from '@angular/router';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: ':country', component: CountryDetailsComponent },
];
