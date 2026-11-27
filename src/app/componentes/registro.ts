import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';
import { mensajeDeError } from '../hooks/autenticacion';

@Component({
  selector: 'app-registro',
  imports: [RouterLink],
  template: `
    <section class="tarjeta tarjeta--angosta">
      <h1 class="tarjeta__titulo">Crear cuenta</h1>

      <form class="pila" novalidate (submit)="registrar($event, correo.value, clave.value, confirmar.value)">
        <label class="etiqueta-campo">
          Correo
          <input #correo class="campo" type="email" autocomplete="email" placeholder="tu@correo.com" />
        </label>

        <label class="etiqueta-campo">
          Contraseña
          <input #clave class="campo" type="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" />
        </label>

        <label class="etiqueta-campo">
          Confirmar contraseña
          <input #confirmar class="campo" type="password" autocomplete="new-password" placeholder="Repite la contraseña" />
        </label>

        @if (error()) {
          <p class="estado estado--error">{{ error() }}</p>
        }

        <button type="submit" class="boton boton--ancho" [disabled]="cargando()">
          {{ cargando() ? 'Creando cuenta...' : 'Registrarme' }}
        </button>
      </form>

      <p class="texto-suave texto-centro">
        ¿Ya tienes cuenta? <a class="enlace" routerLink="/login">Inicia sesión</a>
      </p>
    </section>
  `,
})
export class Registro {
  private autenticacion = inject(AutenticacionServicio);
  private router = inject(Router);

  error = signal('');
  cargando = signal(false);

  async registrar(evento: Event, correo: string, clave: string, confirmar: string): Promise<void> {
    evento.preventDefault();
    this.error.set('');

    if (!correo.trim() || !clave) {
      this.error.set('Escribe tu correo y una contraseña.');
      return;
    }
    if (clave !== confirmar) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    this.cargando.set(true);
    try {
      await this.autenticacion.registrar(correo.trim(), clave);
      this.router.navigate(['/tareas']);
    } catch (error) {
      this.error.set(mensajeDeError(error));
    } finally {
      this.cargando.set(false);
    }
  }
}
