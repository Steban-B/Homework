import { Component, input, output, signal } from '@angular/core';
import { Tarea } from '../modelos/modelo.tarea';

@Component({
  selector: 'app-item-tarea',
  host: { class: 'd-block' },
  template: `
    <div class="card mb-2 tarea" [class.completada]="tarea().completada">
      <div class="card-body d-flex align-items-center gap-2 py-2">
        <input
          class="form-check-input mt-0"
          type="checkbox"
          [checked]="tarea().completada"
          (change)="marcar.emit(!tarea().completada)"
        />

        @if (editando()) {
          <input
            #edicion
            class="form-control form-control-sm flex-grow-1"
            [value]="tarea().titulo"
            (keydown.enter)="guardarEdicion(edicion.value)"
          />
          <button class="btn btn-sm btn-success" (click)="guardarEdicion(edicion.value)">
            Guardar
          </button>
          <button class="btn btn-sm btn-outline-secondary" (click)="editando.set(false)">
            Cancelar
          </button>
        } @else {
          <span class="titulo flex-grow-1">{{ tarea().titulo }}</span>
          <button class="btn btn-sm btn-outline-primary" (click)="editando.set(true)">
            Editar
          </button>
          <button class="btn btn-sm btn-outline-danger" (click)="eliminar.emit()">
            Eliminar
          </button>
        }
      </div>
    </div>
  `,
})
export class ItemTarea {
  tarea = input.required<Tarea>();

  marcar = output<boolean>();
  editar = output<string>();
  eliminar = output<void>();

  editando = signal(false);

  guardarEdicion(valor: string): void {
    const titulo = valor.trim();
    if (!titulo) return;

    this.editar.emit(titulo);
    this.editando.set(false);
  }
}