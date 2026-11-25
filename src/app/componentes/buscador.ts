import { Component, inject } from '@angular/core';
import { MusicaServicio } from '../servicios/musica';

@Component({
  selector: 'app-buscador',
  template: `
    <section class="tarjeta">
      <h2 class="tarjeta__titulo">Buscar canciones</h2>

      <input
        class="campo"
        type="text"
        placeholder="Escribe un titulo..."
        [value]="musica.busqueda()"
        (input)="buscar($event)"
      />

      @if (musica.busqueda() && musica.existe(musica.busqueda())) {
        <p class="estado estado--ok">La cancion existe</p>
      }

      <ul class="lista">
        @for (c of musica.sugerencias(); track c.id) {
          <li class="lista__item lista__item--sugerencia" (click)="musica.seleccionar(c)">
            <span>{{ c.titulo }}</span>
            <small>{{ c.artista }}</small>
          </li>
        } @empty {
          @if (musica.busqueda()) {
            <li class="lista__vacio">Sin sugerencias</li>
          }
        }
      </ul>
    </section>
  `
})
export class Buscador {
  musica = inject(MusicaServicio);

  buscar(evento: Event): void {
    this.musica.buscar((evento.target as HTMLInputElement).value);
  }
}