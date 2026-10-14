import { Routes } from '@angular/router';
import { guardiaAutenticacion, guardiaInvitado } from './guardias/guardias';
import { InicioSesion } from './componentes/login';
import { Registro } from './componentes/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'buscador', pathMatch: 'full' },

  { path: 'login', component: InicioSesion, canActivate: [guardiaInvitado] },
  { path: 'registro', component: Registro, canActivate: [guardiaInvitado] },

  {
    path: 'buscador',
    canActivate: [guardiaAutenticacion],
    loadComponent: () => import('./componentes/Explorador').then((m) => m.Explorador),
  },

  { path: '**', redirectTo: 'buscador' },
];