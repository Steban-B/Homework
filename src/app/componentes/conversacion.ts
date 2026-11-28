import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { ChatServicio } from '../servicios/chat';
import { MensajeChat } from './mensaje';

@Component({
  selector: 'app-conversacion',
  imports: [MensajeChat],
  template: `
    <section class="conversacion" #contenedor>
      @for (mensaje of chat.mensajes(); track mensaje.id) {
        <app-mensaje [mensaje]="mensaje" />
      } @empty {
        <div class="inicio">
          <span class="inicio__icono">✦</span>
          <p>Escribe algo para buscar un GIF</p>
        </div>
      }

      @if (chat.escribiendo()) {
        <div class="escribiendo">
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
    </section>
  `,
})
export class Conversacion {
  chat = inject(ChatServicio);

  private contenedor = viewChild<ElementRef<HTMLElement>>('contenedor');

  constructor() {
    effect(() => {
      this.chat.mensajes();
      this.chat.escribiendo();
      const elemento = this.contenedor()?.nativeElement;
      if (!elemento) return;

      setTimeout(() => elemento.scrollTo({ top: elemento.scrollHeight, behavior: 'smooth' }));
    });
  }
}
