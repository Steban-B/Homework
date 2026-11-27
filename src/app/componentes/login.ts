import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionServicio } from '../servicios/aut.servicio';
import { mensajeDeError } from '../hooks/autenticacion';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink],
  template: `
    <section class="tarjeta tarjeta--angosta">
      <div>
        <h1 class="tarjeta__titulo">Iniciar sesión</h1>
        <p class="texto-suave">Entra para ver tus tareas en tiempo real.</p>
      </div>

      <form class="pila" novalidate (submit)="entrar($event, correo.value, clave.value)">
        <label class="etiqueta-campo">
          Correo
          <input #correo class="campo" type="email" autocomplete="email" placeholder="tu@correo.com" />
        </label>

        <label class="etiqueta-campo">
          Contraseña
          <input #clave class="campo" type="password" autocomplete="current-password" placeholder="••••••" />
        </label>

        @if (error()) {
          <p class="estado estado--error">{{ error() }}</p>
        }

        <button type="submit" class="boton boton--ancho" [disabled]="cargando()">
          {{ cargando() ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="texto-suave texto-centro">
        ¿No tienes cuenta? <a class="enlace" routerLink="/registro">Regístrate</a>
      </p>
    </section>
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

    if (!correo.trim() || !clave) {
      this.error.set('Escribe tu correo y tu contraseña.');
      return;
    }

    this.cargando.set(true);
    try {
      await this.autenticacion.iniciarSesion(correo.trim(), clave);
      this.router.navigate(['/tareas']);
    } catch (error) {
      this.error.set(mensajeDeError(error));
    } finally {
      this.cargando.set(false);
    }
  }
}
