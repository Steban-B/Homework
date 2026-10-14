import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';

export const guardiaAutenticacion: CanActivateFn = async () => {
  const autenticacion = inject(AutenticacionServicio);
  const router = inject(Router);

  await autenticacion.listo;

  return autenticacion.haIniciadoSesion() ? true : router.createUrlTree(['/login']);
};

export const guardiaInvitado: CanActivateFn = async () => {
  const autenticacion = inject(AutenticacionServicio);
  const router = inject(Router);

  await autenticacion.listo;

  return autenticacion.haIniciadoSesion() ? router.createUrlTree(['/buscador']) : true;
};