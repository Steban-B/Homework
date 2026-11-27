import { Component, inject } from '@angular/core';
import { GrafoServicio } from '../servicios/grafo';

@Component({
  selector: 'app-adyacencia',
  template: `
    <section class="panel">
      <h2 class="panel__titulo">Lista de adyacencia</h2>

      <ul class="adyacencia">
        @for (fila of servicio.adyacencia(); track fila.nodo.id) {
          <li
            class="adyacencia__fila"
            [class.adyacencia__fila--activa]="fila.nodo.id === servicio.ciudadSeleccionada()"
          >
            <span class="adyacencia__nodo" [class.adyacencia__nodo--ciudad]="fila.nodo.tipo === 'ciudad'">{{ fila.nodo.nombre }}</span>
            <span class="adyacencia__flecha">→</span>
            <span class="adyacencia__vecinos">
              @for (vecino of fila.vecinos; track vecino.id; let ultimo = $last) {
                {{ vecino.nombre }}{{ ultimo ? '' : ', ' }}
              } @empty {
                <em>sin conexiones</em>
              }
            </span>
          </li>
        }
      </ul>
    </section>
  `,
})
export class Adyacencia {
  servicio = inject(GrafoServicio);
}
