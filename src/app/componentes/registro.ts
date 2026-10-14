import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';
import { mensajeDeError } from '../hooks/usar.auten';

@Component({
  selector: 'app-registro',
  imports: [RouterLink],
  template: `
    <div class="card shadow-sm tarjeta-centrada">
      <div class="card-body">
        <h2 class="h4 mb-3">Crear cuenta</h2>

        <form novalidate (submit)="registrar($event, correo.value, clave.value, repetir.value)">
          <div class="mb-3">
            <label for="correo" class="form-label">Correo</label>
            <input
              #correo
              id="correo"
              type="email"
              class="form-control"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div class="mb-3">
            <label for="clave" class="form-label">Contraseña</label>
            <input
              #clave
              id="clave"
              type="password"
              class="form-control"
              placeholder="Ejemplo: 123456"
            />
            <div class="form-text">Mínimo 6 caracteres.</div>
          </div>

          <div class="mb-3">
            <label for="repetir" class="form-label">Repetir contraseña</label>
            <input
              #repetir
              id="repetir"
              type="password"
              class="form-control"
              placeholder="Escribe la misma contraseña"
            />
          </div>

          @if (error()) {
            <div class="alert alert-danger py-2">{{ error() }}</div>
          }

          <button type="submit" class="btn btn-primary w-100" [disabled]="cargando()">
            {{ cargando() ? 'Creando...' : 'Registrarme' }}
          </button>
        </form>

        <p class="mt-3 mb-0 text-center">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  `,
})
export class Registro {
  private autenticacion = inject(AutenticacionServicio);
  private router = inject(Router);

  error = signal('');
  cargando = signal(false);

  async registrar(evento: Event, correo: string, clave: string, repetir: string): Promise<void> {
    evento.preventDefault();
    this.error.set('');

    const problema = this.validar(correo, clave, repetir);
    if (problema) {
      this.error.set(problema);
      return;
    }

    this.cargando.set(true);

    try {
      await this.autenticacion.registrar(correo.trim(), clave);
      this.router.navigate(['/buscador']);
    } catch (error) {
      this.error.set(mensajeDeError(error));
    } finally {
      this.cargando.set(false);
    }
  }

  private validar(correo: string, clave: string, repetir: string): string {
    if (!correo.trim()) return 'Escribe tu correo.';
    if (!correo.includes('@') || !correo.includes('.')) return 'El correo no es válido.';
    if (clave.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    if (clave !== repetir) return 'Las contraseñas no coinciden.';
    return '';
  }
}