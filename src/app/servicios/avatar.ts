import { Injectable, inject } from '@angular/core';
import { hookAvatar } from '../hooks/avatar';
import { AutenticacionServicio } from './autenticacion';

@Injectable({
  providedIn: 'root',
})
export class AvatarServicio {
  private autenticacion = inject(AutenticacionServicio);
  private hook = hookAvatar();

  readonly subiendo = this.hook.subiendo;
  readonly url = this.autenticacion.avatarUrl;

  async subir(archivo: File): Promise<void> {
    const uid = this.autenticacion.uid();
    if (!uid) throw new Error('No hay sesion');
    await this.hook.subir(uid, archivo);
  }
}
