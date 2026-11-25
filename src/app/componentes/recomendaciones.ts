import { Component, inject } from '@angular/core';
import { MusicaServicio } from '../servicios/musica';

@Component({
  selector: 'app-recomendaciones',
  template: `
    <section class="tarjeta">
      <h2 class="tarjeta__titulo">Recomendaciones</h2>

      <select class="campo" (change)="elegir($event)">
        <option value="0" disabled [selected]="!musica.seleccionada()">Elige una cancion</option>
        @for (c of musica.canciones(); track c.id) {
          <option [value]="c.id" [selected]="c.id === musica.seleccionada()?.id">{{ c.titulo }}</option>
        }
      </select>

      @if (musica.seleccionada(); as actual) {
        <div class="seleccionada">
          <div class="seleccionada__info">
            <strong>{{ actual.titulo }}</strong>
            <small>{{ actual.artista }} - {{ actual.genero }}</small>
            <small>{{ musica.formatear(actual.reproducciones) }} reproducciones</small>
          </div>
        </div>

        <h3 class="subtitulo">Porque escuchas {{ actual.titulo }}</h3>

        <ul class="lista">
          @for (c of musica.recomendaciones(); track c.id) {
            <li class="lista__item" (click)="musica.seleccionar(c)">
              <span>{{ c.titulo }}</span>
              <small>{{ c.artista }}</small>
              <span [class]="'etiqueta etiqueta--' + c.genero.toLowerCase()">{{ c.genero }}</span>
            </li>
          } @empty {
            <li class="lista__vacio">No tiene canciones relacionadas</li>
          }
        </ul>
      } @else {
        <p class="lista__vacio">Selecciona una cancion para ver recomendaciones</p>
      }
    </section>
  `
})
export class Recomendaciones {
  musica = inject(MusicaServicio);

  elegir(evento: Event): void {
    const cancion = this.musica.buscarPorId(+(evento.target as HTMLSelectElement).value);
    if (cancion) this.musica.seleccionar(cancion);
  }
}