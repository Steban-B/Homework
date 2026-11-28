import { Component, inject } from '@angular/core';
import { ChatServicio } from '../servicios/chat';

@Component({
  selector: 'app-encabezado',
  template: `
    <header class="encabezado">
      <span class="encabezado__avatar">N</span>
      <div class="encabezado__info">
        <strong>Netanyahu</strong>
        <small [class.encabezado__estado--escribiendo]="chat.escribiendo()">
          {{ chat.escribiendo() ? 'escribiendo...' : 'en línea' }}
        </small>
      </div>
      <span class="encabezado__marca">Powered by One Piece</span>
    </header>
  `,
})
export class Encabezado {
  chat = inject(ChatServicio);
}
