import { Component, computed, inject } from '@angular/core';
import { BuscadorServicio } from '../servicios/buscador';

@Component({
  selector: 'app-resultados',
  template: `
    <section class="panel">
      <div class="panel__cabecera">
        <h2 class="panel__titulo">
          Top {{ servicio.k() }}
          @if (servicio.busqueda().trim()) {
            para "{{ servicio.busqueda().trim() }}"
          }
        </h2>
        <span class="panel__nota">ordenado por popularidad</span>
      </div>

      <ol class="ranking">
        @for (producto of servicio.topK(); track producto.id; let i = $index) {
          <li class="ranking__item" [class.ranking__item--podio]="i < 3">
            <span class="ranking__posicion">{{ i + 1 }}</span>

            <div class="ranking__info">
              <strong>
                <mark>{{ producto.nombre.slice(0, largoPrefijo()) }}</mark>{{ producto.nombre.slice(largoPrefijo()) }}
              </strong>
            </div>

            <div class="barra">
              <div class="barra__relleno" [style.width.%]="producto.popularidad"></div>
            </div>
            <span class="ranking__puntos">{{ producto.popularidad }}</span>
          </li>
        } @empty {
          <li class="vacio">Ningún producto empieza con "{{ servicio.busqueda().trim() }}".</li>
        }
      </ol>
    </section>
  `,
})
export class Resultados {
  servicio = inject(BuscadorServicio);

  largoPrefijo = computed(() => this.servicio.busqueda().trim().replace(/\s+/g, ' ').length);
}
