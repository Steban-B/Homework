import { Component, inject } from '@angular/core';
import { MusicaServicio } from '../servicios/musica';

@Component({
  selector: 'app-ranking',
  template: `
    <section class="tarjeta">
      <div class="tarjeta__cabecera">
        <h2 class="tarjeta__titulo">Top canciones</h2>
        <select class="campo campo--pequeno" (change)="cambiar($event)">
          @for (k of opciones; track k) {
            <option [value]="k" [selected]="k === musica.topK()">Top {{ k }}</option>
          }
        </select>
      </div>

      <ol class="ranking">
        @for (c of musica.ranking(); track c.id; let i = $index) {
          <li [class]="'ranking__item posicion-' + (i + 1)">
            <span class="ranking__posicion">{{ i + 1 }}</span>
            <div class="ranking__info">
              <strong>{{ c.titulo }}</strong>
              <small>{{ c.artista }}</small>
            </div>
            <span class="ranking__numero">{{ musica.formatear(c.reproducciones) }}</span>
          </li>
        }
      </ol>
    </section>
  `
})
export class Ranking {
  musica = inject(MusicaServicio);
  opciones = [3, 5, 10];

  cambiar(evento: Event): void {
    this.musica.cambiarTop(+(evento.target as HTMLSelectElement).value);
  }
}