import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pagina',
  template: `
    <p class="ruta">{{ enlace() }}</p>
    <h2>{{ titulo() }}</h2>
  `,
  styles: `
    .ruta {
      margin: 0 0 8px;
      color: #666;
      font-family: monospace;
    }
  `,
})
export class Pagina {
  titulo = input('');
  enlace = input('');
}