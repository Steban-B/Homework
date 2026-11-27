import { Injectable, computed } from '@angular/core';
import { hookAutenticacion } from '../hooks/autenticacion';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionServicio {
  private hook = hookAutenticacion();

  readonly usuario = this.hook.usuario;
  readonly listo = this.hook.listo;

  readonly haIniciadoSesion = computed(() => this.usuario() !== null);
  readonly uid = computed(() => this.usuario()?.id ?? null);
  readonly correo = computed(() => this.usuario()?.email ?? '');
  readonly avatarUrl = computed<string | null>(() => this.usuario()?.user_metadata?.['avatar_url'] ?? null);
  readonly inicial = computed(() => this.correo().charAt(0).toUpperCase() || '?');

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
