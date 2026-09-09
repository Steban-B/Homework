import { Routes } from '@angular/router';
import { ClinicaService } from './services/clinica';

export const routes: Routes = [
  { path: '', redirectTo: 'clinica', pathMatch: 'full' },
  { path: 'clinica', component: ClinicaService }
];