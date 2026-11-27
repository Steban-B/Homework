import { Component, inject } from '@angular/core';
import { GrafoServicio } from '../servicios/grafo';

@Component({
  selector: 'app-ciudades',
  template: `
    <section class="panel">
      <h2 class="panel__titulo">Ciudades</h2>

      <ul class="ciudades">
        @for (ciudad of servicio.ciudades(); track ciudad.id) {
          <li
            class="ciudades__item"
            [class.ciudades__item--activa]="ciudad.id === servicio.ciudadSeleccionada()"
            (click)="servicio.seleccionarCiudad(ciudad.id)"
          >
            <span class="ciudades__punto"></span>
            <span class="ciudades__nombre">{{ ciudad.nombre }}</span>
            <span class="ciudades__conteo">{{ ciudad.habitantes }} {{ ciudad.habitantes === 1 ? 'persona' : 'personas' }}</span>
            <button
              type="button"
              class="boton-icono"
              [disabled]="ciudad.habitantes > 0"
              [title]="ciudad.habitantes > 0 ? 'Primero mueve o elimina sus personas' : 'Eliminar ciudad'"
              (click)="eliminar($event, ciudad.id)"
            >
              ✕
            </button>
          </li>
        } @empty {
          <li class="vacio">No hay ciudades, agrega una arriba.</li>
        }
      </ul>
    </section>
  `,
})
export class Ciudades {
  servicio = inject(GrafoServicio);

  eliminar(evento: Event, id: string): void {
    evento.stopPropagation();
    this.servicio.eliminarCiudad(id);
  }
}
