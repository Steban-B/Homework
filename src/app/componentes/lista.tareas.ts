import { Component, inject } from '@angular/core';
import { TareasServicio } from '../servicios/tareas';
import { Filtro } from '../modelos/tarea';
import { FormularioTarea } from './formulario';
import { ItemTarea } from './item.tarea';

@Component({
  selector: 'app-lista-tareas',
  imports: [FormularioTarea, ItemTarea],
  template: `
    <section class="tarjeta">
      <h1 class="tarjeta__titulo">Mis tareas</h1>

      <div class="resumen">
        <div class="resumen__dato">
          <strong>{{ servicio.tareas().length }}</strong>
          <small>Total</small>
        </div>
        <div class="resumen__dato">
          <strong>{{ servicio.pendientes() }}</strong>
          <small>Pendientes</small>
        </div>
        <div class="resumen__dato">
          <strong>{{ servicio.completadas() }}</strong>
          <small>Completadas</small>
        </div>
      </div>

      <app-formulario-tarea (guardar)="servicio.agregar($event)" />

      @if (servicio.error()) {
        <p class="estado estado--error">{{ servicio.error() }}</p>
      }

      <div class="filtros">
        @for (opcion of filtros; track opcion.valor) {
          <button
            type="button"
            class="filtros__boton"
            [class.filtros__boton--activo]="servicio.filtro() === opcion.valor"
            (click)="servicio.filtro.set(opcion.valor)"
          >
            {{ opcion.texto }}
          </button>
        }
      </div>

      @if (servicio.cargando() && servicio.tareas().length === 0) {
        <p class="lista-vacia">Cargando tareas...</p>
      } @else {
        <ul class="lista-tareas">
          @for (tarea of servicio.tareasFiltradas(); track tarea.id) {
            <app-item-tarea
              [tarea]="tarea"
              (marcar)="servicio.marcar(tarea.id, $event)"
              (editar)="servicio.editar(tarea.id, $event)"
              (eliminar)="servicio.eliminar(tarea.id)"
            />
          } @empty {
            <li class="lista-vacia">
              @if (servicio.tareas().length === 0) {
                No tienes tareas, agrega la primera arriba.
              } @else {
                No hay tareas en este filtro.
              }
            </li>
          }
        </ul>
      }
    </section>
  `,
})
export class ListaTareas {
  servicio = inject(TareasServicio);

  filtros: { valor: Filtro; texto: string }[] = [
    { valor: 'todas', texto: 'Todas' },
    { valor: 'pendientes', texto: 'Pendientes' },
    { valor: 'completadas', texto: 'Completadas' },
  ];
}
