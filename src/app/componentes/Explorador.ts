import { Component, inject } from '@angular/core';
import { NodosServicio } from '../servicios/nodos';
import { ElementoNodo } from './elementos.nodo';

@Component({
  selector: 'app-explorador',
  imports: [ElementoNodo],
  template: `
    <div class="explorador">
      <h2 class="h4 mb-3">Explorador de archivos</h2>
      <div class="card shadow-sm">
        <div class="card-body arbol-nodos">
          <app-elemento-nodo [nodo]="servicio.raiz()" />
        </div>
      </div>
    </div>
  `,
})
export class Explorador {
  servicio = inject(NodosServicio);
}