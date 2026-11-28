import { Component, computed, inject } from '@angular/core';
import { BuscadorServicio } from '../servicios/buscador';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-heap',
  template: `
    <section class="panel">
      <h2 class="panel__titulo">Min heap del top {{ servicio.k() }}</h2>

      @if (servicio.heap().length) {
        <div class="arbol">
          @for (nivel of niveles(); track $index) {
            <div class="arbol__nivel">
              @for (celda of nivel; track celda.indice) {
                @if (celda.producto; as producto) {
                  <div class="arbol__nodo" [class.arbol__nodo--raiz]="celda.indice === 0">
                    <strong>{{ producto.popularidad }}</strong>
                    <small>{{ producto.nombre }}</small>
                  </div>
                } @else {
                  <div class="arbol__hueco"></div>
                }
              }
            </div>
          }
        </div>

        <div class="arreglo">
          @for (producto of servicio.heap(); track producto.id; let i = $index) {
            <div class="arreglo__celda">
              <span class="arreglo__indice">{{ i }}</span>
              <span class="arreglo__valor">{{ producto.popularidad }}</span>
            </div>
          }
        </div>
      } @else {
        <p class="vacio">El heap está vacío para esta búsqueda.</p>
      }
    </section>
  `,
})
export class Heap {
  servicio = inject(BuscadorServicio);

  niveles = computed(() => {
    const heap = this.servicio.heap();
    const niveles: { indice: number; producto: Producto | null }[][] = [];

    for (let inicio = 0, tamano = 1; inicio < heap.length; inicio += tamano, tamano *= 2) {
      niveles.push(
        Array.from({ length: tamano }, (_, j) => ({ indice: inicio + j, producto: heap[inicio + j] ?? null })),
      );
    }
    return niveles;
  });
}
