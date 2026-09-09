import { Routes } from '@angular/router';
import { Clinica } from './clinica/clinica';

export const routes: Routes = [
  { path: '', redirectTo: 'clinica', pathMatch: 'full' },
  { path: 'clinica', component: Clinica }
];