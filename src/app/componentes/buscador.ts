import { Component, inject } from '@angular/core';
import { BuscadorServicio } from '../servicios/buscador';

@Component({
  selector: 'app-buscador',
  template: `
    <section class="buscador">
      <div class="buscador__caja">
        <span class="buscador__icono">⌕</span>
        <input
          class="buscador__campo"
          type="text"
          placeholder="Busca por prefijo, por ejemplo air, nike o new"
          [value]="servicio.busqueda()"
          (input)="servicio.buscar($any($event.target).value)"
        />
        @if (servicio.busqueda()) {
          <button type="button" class="buscador__limpiar" title="Limpiar" (click)="servicio.buscar('')">✕</button>
        }
      </div>

      <div class="buscador__opciones">
        <div class="segmentos">
          <span class="segmentos__etiqueta">Top</span>
          @for (k of servicio.opcionesK; track k) {
            <button
              type="button"
              class="segmentos__boton"
              [class.segmentos__boton--activo]="k === servicio.k()"
              (click)="servicio.cambiarK(k)"
            >
              {{ k }}
            </button>
          }
        </div>

        <p class="buscador__info">
          @if (servicio.busqueda().trim()) {
            <strong>{{ servicio.coincidencias().length }}</strong>
            {{ servicio.coincidencias().length === 1 ? 'producto empieza' : 'productos empiezan' }} con
            <strong>"{{ servicio.busqueda().trim() }}"</strong>
            @if (servicio.existeExacto()) {
              <span class="insignia">palabra completa en el trie</span>
            }
          }
        </p>
      </div>
    </section>
  `,
})
export class Buscador {
  servicio = inject(BuscadorServicio);
}
