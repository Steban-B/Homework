import { Component, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Tarea } from '../modelos/tarea';

@Component({
  selector: 'app-item-tarea',
  imports: [DatePipe],
  template: `
    <li class="tarea" [class.tarea--completada]="tarea().completada">
      <input
        class="tarea__check"
        type="checkbox"
        [checked]="tarea().completada"
        (change)="marcar.emit(!tarea().completada)"
        aria-label="Marcar tarea"
      />

      @if (editando()) {
        <input
          #edicion
          class="campo campo--pequeno tarea__edicion"
          [value]="tarea().titulo"
          (keydown.enter)="guardarEdicion(edicion.value)"
          (keydown.escape)="editando.set(false)"
        />
        <div class="tarea__acciones tarea__acciones--visibles">
          <button type="button" class="boton boton--pequeno" (click)="guardarEdicion(edicion.value)">Guardar</button>
          <button type="button" class="boton boton--borde boton--pequeno" (click)="editando.set(false)">Cancelar</button>
        </div>
      } @else {
        <div class="tarea__info">
          <span class="tarea__titulo">{{ tarea().titulo }}</span>
          <small class="tarea__fecha">{{ tarea().creada_en | date: "d 'de' MMM, h:mm a" }}</small>
        </div>
        <div class="tarea__acciones">
          <button type="button" class="boton-icono" title="Editar" (click)="editando.set(true)">✎</button>
          <button type="button" class="boton-icono boton-icono--peligro" title="Eliminar" (click)="eliminar.emit()">✕</button>
        </div>
      }
    </li>
  `,
})
export class ItemTarea {
  tarea = input.required<Tarea>();

  marcar = output<boolean>();
  editar = output<string>();
  eliminar = output<void>();

  editando = signal(false);

  guardarEdicion(titulo: string): void {
    const limpio = titulo.trim();
    if (limpio && limpio !== this.tarea().titulo) this.editar.emit(limpio);
    this.editando.set(false);
  }
}
