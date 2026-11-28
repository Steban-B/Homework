import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-barra',
  template: `
    <form class="barra" (submit)="enviar($event)">
      <input
        class="barra__campo"
        type="text"
        maxlength="50"
        placeholder="Escribe para buscar un GIF..."
        autocomplete="off"
        [value]="texto()"
        (input)="texto.set($any($event.target).value)"
      />
      <button type="submit" class="barra__boton" [disabled]="!texto().trim()" title="Enviar">➤</button>
    </form>
  `,
})
export class Barra {
  buscar = output<string>();

  texto = signal('');

  enviar(evento: Event): void {
    evento.preventDefault();
    const limpio = this.texto().trim();
    if (!limpio) return;

    this.buscar.emit(limpio);
    this.texto.set('');
  }
}
