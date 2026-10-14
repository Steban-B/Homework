import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionServicio } from './autenticacion';

export const guardiaAutenticacion: CanActivateFn = (ruta, estado) => {
  const autenticacion = inject(AutenticacionServicio);
  const router = inject(Router);

  if (autenticacion.haIniciadoSesion()) {
    return true;
  }

  return router.createUrlTree(['/login'], { queryParams: { retorno: estado.url } });
};