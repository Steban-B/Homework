import { Component, inject } from '@angular/core';
import { ChatServicio } from './servicios/chat';
import { Encabezado } from './componentes/encabezado';
import { Conversacion } from './componentes/conversacion';
import { Barra } from './componentes/barra';

@Component({
  selector: 'app-root',
  imports: [Encabezado, Conversacion, Barra],
  template: `
    <main class="ventana">
      <app-encabezado />
      <app-conversacion />
      <app-barra (buscar)="chat.enviar($event)" />
    </main>
  `,
})
export class App {
  chat = inject(ChatServicio);
}
