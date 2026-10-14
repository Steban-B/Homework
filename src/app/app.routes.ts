import { Routes } from '@angular/router';
import { guardiaAutenticacion, guardiaInvitado } from './guardias/guardias';
import { InicioSesion } from './componentes/login';
import { Registro } from './componentes/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },

  { path: 'login', component: InicioSesion, canActivate: [guardiaInvitado] },
  { path: 'registro', component: Registro, canActivate: [guardiaInvitado] },

  {
    path: 'tareas',
    canActivate: [guardiaAutenticacion],
    loadComponent: () => import('./componentes/tareas').then((m) => m.Tareas),
  },

  { path: '**', redirectTo: 'tareas' },
];