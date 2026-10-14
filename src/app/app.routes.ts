import { Routes } from '@angular/router';
import { guardiaAutenticacion } from './servicios/guardia';
import { Error404 } from './componentes/error404';
import { Login } from './componentes/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: 'privado',
    canActivate: [guardiaAutenticacion],
    children: [
      { path: '', redirectTo: 'arbol-binario', pathMatch: 'full' },
      {
        path: 'arbol-binario',
        loadComponent: () => import('./componentes/arbol').then((m) => m.Arbol),
      },
      {
        path: 'Arbol N-ario',
        loadComponent: () => import('./componentes/panel').then((m) => m.Panel),
      },
    ],
  },

  { path: '**', component: Error404 },
];