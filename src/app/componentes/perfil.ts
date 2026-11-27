import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AutenticacionServicio } from '../servicios/autenticacion';
import { AvatarServicio } from '../servicios/avatar';
import { TareasServicio } from '../servicios/tareas';
import { FotoPerfil } from './foto.perfil';

const TAMANO_MAXIMO = 2 * 1024 * 1024;

@Component({
  selector: 'app-perfil',
  imports: [DatePipe, FotoPerfil],
  template: `
    <section class="tarjeta tarjeta--angosta">
      <h1 class="tarjeta__titulo">Mi perfil</h1>

      <div class="perfil">
        <app-foto-perfil [url]="vistaPrevia() ?? avatar.url()" [inicial]="autenticacion.inicial()" [grande]="true" />

        <div class="perfil__datos">
          <strong>{{ autenticacion.correo() }}</strong>
          <small class="texto-suave">Cuenta creada el {{ autenticacion.usuario()?.created_at | date: 'd/MM/yyyy' }}</small>
          <small class="texto-suave">{{ tareas.tareas().length }} tareas, {{ tareas.completadas() }} completadas</small>
        </div>
      </div>

      <div class="pila">
        <span class="subtitulo">Foto de perfil</span>

        <label class="selector-archivo">
          <input type="file" accept="image/png, image/jpeg, image/webp" (change)="elegir($event)" />
          {{ archivo()?.name ?? 'Elegir imagen (PNG, JPG o WEBP, máx. 2 MB)' }}
        </label>

        @if (error()) {
          <p class="estado estado--error">{{ error() }}</p>
        }
        @if (exito()) {
          <p class="estado estado--ok">{{ exito() }}</p>
        }

        <button type="button" class="boton boton--ancho" [disabled]="!archivo() || avatar.subiendo()" (click)="subir()">
          {{ avatar.subiendo() ? 'Subiendo...' : 'Guardar foto' }}
        </button>
      </div>
    </section>
  `,
})
export class Perfil {
  autenticacion = inject(AutenticacionServicio);
  avatar = inject(AvatarServicio);
  tareas = inject(TareasServicio);

  archivo = signal<File | null>(null);
  vistaPrevia = signal<string | null>(null);
  error = signal('');
  exito = signal('');

  elegir(evento: Event): void {
    const entrada = evento.target as HTMLInputElement;
    const archivo = entrada.files?.[0] ?? null;
    this.error.set('');
    this.exito.set('');
    this.limpiarVistaPrevia();

    if (!archivo) {
      this.archivo.set(null);
      return;
    }
    if (!archivo.type.startsWith('image/')) {
      this.error.set('El archivo tiene que ser una imagen.');
      entrada.value = '';
      return;
    }
    if (archivo.size > TAMANO_MAXIMO) {
      this.error.set('La imagen pesa más de 2 MB.');
      entrada.value = '';
      return;
    }

    this.archivo.set(archivo);
    this.vistaPrevia.set(URL.createObjectURL(archivo));
  }

  async subir(): Promise<void> {
    const archivo = this.archivo();
    if (!archivo) return;

    this.error.set('');
    try {
      await this.avatar.subir(archivo);
      this.exito.set('Foto actualizada.');
      this.archivo.set(null);
      this.limpiarVistaPrevia();
    } catch {
      this.error.set('No se pudo subir la foto, intenta de nuevo.');
    }
  }

  private limpiarVistaPrevia(): void {
    const url = this.vistaPrevia();
    if (url) URL.revokeObjectURL(url);
    this.vistaPrevia.set(null);
  }
}
