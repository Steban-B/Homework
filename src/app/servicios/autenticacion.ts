import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionServicio {
  private readonly correoValido = 'user@mail.com';
  private readonly claveValida = '123';

  private usuario = signal<string | null>(null);

  readonly nombreUsuario = this.usuario.asReadonly();
  readonly haIniciadoSesion = computed(() => this.usuario() !== null);

  login(correo: string, clave: string): boolean {
    const correoLimpio = correo.trim().toLowerCase();

    if (correoLimpio === this.correoValido && clave === this.claveValida) {
      this.usuario.set(correoLimpio.split('@')[0]);
      return true;
    }
    return false;
  }

  cerrarSesion(): void {
    this.usuario.set(null);
  }
}