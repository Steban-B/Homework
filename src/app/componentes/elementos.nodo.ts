import { Component, computed, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Nodo, TipoNodo } from '../modelos/modelo.nodo';
import { AutenticacionServicio } from '../servicios/autenticacion';
import { NodosServicio } from '../servicios/nodos';

@Component({
  selector: 'app-elemento-nodo',
  imports: [ElementoNodo, DatePipe],
  template: `
    <div class="fila">
      @if (nodo().tipo === 'carpeta') {
        <button type="button" class="flecha" (click)="abierto.update((v) => !v)">
          {{ abierto() ? '▾' : '▸' }}
        </button>
      } @else {
        <span class="flecha"></span>
      }

      <span class="icono">{{ nodo().tipo === 'carpeta' ? '📁' : '📄' }}</span>
      <span class="nombre">{{ nodo().nombre }}</span>

      @if (nodo().creadoPor) {
        <small class="meta">
          Creador: {{ nodo().creadoPor }} · {{ nodo().creada | date: 'dd/MM/yyyy HH:mm' }}
        </small>
        <small class="meta tipo">
          Tipo: {{ nodo().tipo === 'carpeta' ? 'Carpeta' : 'Archivo' }}
        </small>
      }

      <span class="acciones">
        @if (nodo().tipo === 'carpeta') {
          <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            (click)="agregando.set(!agregando())"
          >
            + Nuevo
          </button>
        }
        @if (puedeEliminar()) {
          <button type="button" class="btn btn-sm btn-outline-danger" (click)="eliminar()">
            Eliminar
          </button>
        }
      </span>
    </div>

    @if (agregando()) {
      <div class="formulario input-group input-group-sm">
        <input
          #entrada
          type="text"
          class="form-control"
          placeholder="Nombre"
          (keydown.enter)="crear(entrada, 'carpeta')"
        />
        <button type="button" class="btn btn-outline-secondary" (click)="crear(entrada, 'carpeta')">
          Carpeta
        </button>
        <button type="button" class="btn btn-outline-secondary" (click)="crear(entrada, 'archivo')">
          Archivo
        </button>
      </div>
    }

    @if (error()) {
      <div class="alert alert-danger py-1 my-1">{{ error() }}</div>
    }

    @if (abierto() && nodo().hijos.length > 0) {
      <div class="hijos">
        @for (hijo of nodo().hijos; track hijo.id) {
          <app-elemento-nodo [nodo]="hijo" />
        }
      </div>
    }
  `,
})
export class ElementoNodo {
  private servicio = inject(NodosServicio);
  private autenticacion = inject(AutenticacionServicio);

  nodo = input.required<Nodo>();

  abierto = signal(true);
  agregando = signal(false);
  error = signal('');

  puedeEliminar = computed(() => {
    const nodo = this.nodo();
    const correo = this.autenticacion.usuario()?.email;
    return !!nodo.creadoPor && nodo.creadoPor === correo && nodo.hijos.length === 0;
  });

  async crear(entrada: HTMLInputElement, tipo: TipoNodo): Promise<void> {
    this.error.set('');
    try {
      await this.servicio.crear(entrada.value, tipo, this.nodo().id);
      entrada.value = '';
      this.abierto.set(true);
    } catch (e) {
      this.mostrarError(e);
    }
  }

  async eliminar(): Promise<void> {
    this.error.set('');
    try {
      await this.servicio.eliminar(this.nodo().id);
    } catch (e) {
      this.mostrarError(e);
    }
  }

  private mostrarError(e: unknown): void {
    const codigo = (e as { code?: string }).code;
    this.error.set(
      codigo === 'permission-denied' ? 'No tienes permiso para hacer esto.' : (e as Error).message
    );
  }
}