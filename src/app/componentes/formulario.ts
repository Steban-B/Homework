import { Component, inject, signal } from '@angular/core';
import { BuscadorServicio, Resultado } from '../servicios/buscador';

@Component({
  selector: 'app-formulario',
  template: `
    <section class="panel">
      <h2 class="panel__titulo">Agregar producto</h2>

      <form class="pila" (submit)="agregar($event, nombre)">
        <input #nombre class="campo" type="text" maxlength="40" placeholder="Nombre, ej: Air Max Plus" />

        <label class="deslizador">
          <span class="deslizador__fila">
            Popularidad
            <strong>{{ popularidad() }}</strong>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            [value]="popularidad()"
            (input)="popularidad.set(+$any($event.target).value)"
          />
        </label>

        <button type="submit" class="boton">Insertar en el trie</button>
      </form>

      @if (resultado(); as r) {
        <p class="aviso" [class.aviso--ok]="r.ok" [class.aviso--error]="!r.ok">{{ r.mensaje }}</p>
      }
    </section>
  `,
})
export class Formulario {
  private servicio = inject(BuscadorServicio);

  popularidad = signal(50);
  resultado = signal<Resultado | null>(null);

  agregar(evento: Event, nombre: HTMLInputElement): void {
    evento.preventDefault();
    const resultado = this.servicio.agregar(nombre.value, this.popularidad());
    this.resultado.set(resultado);

    if (resultado.ok) {
      nombre.value = '';
      this.popularidad.set(50);
    }
  }
}
