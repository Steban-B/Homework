import { Component, inject } from '@angular/core';
import { TareasServicio } from '../servicios/tareas.servicio';
import { FormularioTarea } from './formulario';
import { ItemTarea } from './item.tarea';

@Component({
  selector: 'app-tareas',
  imports: [FormularioTarea, ItemTarea],
  template: `
    <div class="contenedor-tareas">
      <h2 class="h4 mb-3">Mis tareas</h2>

      <app-formulario-tarea (guardar)="servicio.agregar($event)" />

      <div class="mt-3">
        @for (tarea of servicio.tareas(); track tarea.id) {
          <app-item-tarea
            [tarea]="tarea"
            (marcar)="servicio.marcar(tarea.id, $event)"
            (editar)="servicio.editar(tarea.id, $event)"
            (eliminar)="servicio.eliminar(tarea.id)"
          />
        } @empty {
          <p class="text-muted text-center mt-4">No tienes tareas. ¡Agrega la primera!</p>
        }
      </div>
    </div>
  `,
})
export class Tareas {
  servicio = inject(TareasServicio);
}