import { Injectable, computed } from '@angular/core';
import { usarAutenticacion } from '../hooks/usar.auten';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionServicio {
  private hook = usarAutenticacion();

  readonly usuario = this.hook.usuario;
  readonly listo = this.hook.listo;
  readonly haIniciadoSesion = computed(() => this.usuario() !== null);

  registrar(correo: string, clave: string): Promise<void> {
    return this.hook.registrar(correo, clave);
  }

  iniciarSesion(correo: string, clave: string): Promise<void> {
    return this.hook.iniciarSesion(correo, clave);
  }

  cerrarSesion(): Promise<void> {
    return this.hook.cerrarSesion();
  }
}