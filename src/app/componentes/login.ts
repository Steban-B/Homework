import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';
import { mensajeDeError } from '../hooks/usar.auten';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink],
  template: `
    <div class="card shadow-sm tarjeta-centrada">
      <div class="card-body">
        <h2 class="h4 mb-3">Iniciar sesión</h2>

        <form novalidate (submit)="entrar($event, correo.value, clave.value)">
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
            <input #clave id="clave" type="password" class="form-control" />
          </div>

          @if (error()) {
            <div class="alert alert-danger py-2">{{ error() }}</div>
          }

          <button type="submit" class="btn btn-primary w-100" [disabled]="cargando()">
            {{ cargando() ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="mt-3 mb-0 text-center">
          ¿No tienes cuenta? <a routerLink="/registro">Regístrate</a>
        </p>
      </div>
    </div>
  `,
})
export class InicioSesion {
  private autenticacion = inject(AutenticacionServicio);
  private router = inject(Router);

  error = signal('');
  cargando = signal(false);

  async entrar(evento: Event, correo: string, clave: string): Promise<void> {
    evento.preventDefault();
    this.error.set('');
    this.cargando.set(true);

    try {
      await this.autenticacion.iniciarSesion(correo.trim(), clave);
      this.router.navigate(['/buscador']);
    } catch (error) {
      this.error.set(mensajeDeError(error));
    } finally {
      this.cargando.set(false);
    }
  }
}