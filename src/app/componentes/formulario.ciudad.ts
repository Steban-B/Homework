import { Component, inject, signal } from '@angular/core';
import { GrafoServicio, Resultado } from '../servicios/grafo';

@Component({
  selector: 'app-formulario-ciudad',
  template: `
    <section class="panel">
      <h2 class="panel__titulo">Nueva ciudad</h2>

      <form class="en-linea" (submit)="agregar($event, nombre)">
        <input #nombre class="campo" type="text" maxlength="40" placeholder="Ej: Cartagena" />
        <button type="submit" class="boton boton--ciudad">Agregar</button>
      </form>

      @if (resultado(); as r) {
        <p class="aviso" [class.aviso--ok]="r.ok" [class.aviso--error]="!r.ok">{{ r.mensaje }}</p>
      }
    </section>
  `,
})
export class FormularioCiudad {
  private servicio = inject(GrafoServicio);

  resultado = signal<Resultado | null>(null);

  agregar(evento: Event, entrada: HTMLInputElement): void {
    evento.preventDefault();
    const resultado = this.servicio.agregarCiudad(entrada.value);
    this.resultado.set(resultado);
    if (resultado.ok) entrada.value = '';
  }
}
