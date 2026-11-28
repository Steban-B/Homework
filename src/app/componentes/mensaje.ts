import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Mensaje } from '../modelos/mensaje';

@Component({
  selector: 'app-mensaje',
  imports: [DatePipe],
  template: `
    @let m = mensaje();

    <div class="mensaje" [class.mensaje--usuario]="m.autor === 'usuario'" [class.mensaje--bot]="m.autor === 'bot'">
      @if (m.autor === 'usuario') {
        <span class="mensaje__busqueda">{{ m.texto }}</span>

        @if (m.cargando) {
          <div class="mensaje__cargando"></div>
        } @else if (m.gif) {
          <img class="mensaje__gif" [src]="m.gif.url" [alt]="m.gif.titulo" [width]="m.gif.ancho" [height]="m.gif.alto" />
        }
      } @else if (m.gif) {
        <img class="mensaje__sticker" [src]="m.gif.url" [alt]="m.gif.titulo" [width]="m.gif.ancho" [height]="m.gif.alto" />
      } @else {
        <p class="mensaje__texto">{{ m.texto }}</p>
      }

      <time class="mensaje__hora">{{ m.hora | date: 'h:mm a' }}</time>
    </div>
  `,
})
export class MensajeChat {
  mensaje = input.required<Mensaje>();
}
