import { Component, computed, inject, signal } from '@angular/core';
import { GrafoServicio, Resultado } from '../servicios/grafo';

@Component({
  selector: 'app-formulario-persona',
  template: `
    <section class="panel">
      <h2 class="panel__titulo">Nueva persona</h2>

      <form class="formulario" (submit)="agregar($event, nombre, edad)">
        <input #nombre class="campo formulario__completo" type="text" maxlength="40" placeholder="Nombre" />
        <input #edad class="campo" type="number" min="1" max="120" placeholder="Edad" />

        <select class="campo" (change)="ciudadElegida.set($any($event.target).value)">
          @for (ciudad of servicio.ciudades(); track ciudad.id) {
            <option [value]="ciudad.id" [selected]="ciudad.id === ciudadDestino()">{{ ciudad.nombre }}</option>
          }
        </select>

        <button type="submit" class="boton formulario__completo" [disabled]="!ciudadDestino()">Agregar persona</button>
      </form>

      @if (resultado(); as r) {
        <p class="aviso" [class.aviso--ok]="r.ok" [class.aviso--error]="!r.ok">{{ r.mensaje }}</p>
      }
    </section>
  `,
})
export class FormularioPersona {
  servicio = inject(GrafoServicio);

  ciudadElegida = signal('');
  resultado = signal<Resultado | null>(null);

  ciudadDestino = computed(() => {
    const ciudades = this.servicio.ciudades();
    const elegida = this.ciudadElegida();
    return ciudades.some((c) => c.id === elegida) ? elegida : (ciudades[0]?.id ?? '');
  });

  agregar(evento: Event, nombre: HTMLInputElement, edad: HTMLInputElement): void {
    evento.preventDefault();
    const resultado = this.servicio.agregarPersona(nombre.value, Number(edad.value), this.ciudadDestino());
    this.resultado.set(resultado);

    if (resultado.ok) {
      nombre.value = '';
      edad.value = '';
    }
  }
}
