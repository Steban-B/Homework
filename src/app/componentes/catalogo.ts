import { Component, inject } from '@angular/core';
import { BuscadorServicio } from '../servicios/buscador';

@Component({
  selector: 'app-catalogo',
  template: `
    <section class="panel">
      <div class="panel__cabecera">
        <h2 class="panel__titulo">Catálogo</h2>
        <span class="panel__nota">{{ servicio.catalogo().length }} en el trie</span>
      </div>

      <ul class="catalogo">
        @for (producto of servicio.catalogo(); track producto.id) {
          <li class="catalogo__item" title="Buscar este producto" (click)="servicio.buscar(producto.nombre)">
            <span class="catalogo__nombre">{{ producto.nombre }}</span>
            <span class="catalogo__puntos">{{ producto.popularidad }}</span>
          </li>
        }
      </ul>
    </section>
  `,
})
export class Catalogo {
  servicio = inject(BuscadorServicio);
}
