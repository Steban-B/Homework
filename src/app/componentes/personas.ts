import { Component, inject } from '@angular/core';
import { GrafoServicio } from '../servicios/grafo';

@Component({
  selector: 'app-personas',
  template: `
    <section class="panel">
      @if (servicio.ciudadActual(); as ciudad) {
        <div class="panel__cabecera">
          <h2 class="panel__titulo">Personas en {{ ciudad.nombre }}</h2>
          <span class="chip chip--ciudad">{{ servicio.personasDeCiudad().length }}</span>
        </div>

        <ul class="personas">
          @for (persona of servicio.personasDeCiudad(); track persona.id) {
            <li class="personas__item">
              <span class="personas__inicial">{{ persona.nombre.charAt(0) }}</span>
              <div class="personas__info">
                <strong>{{ persona.nombre }}</strong>
                <small>{{ persona.edad }} años</small>
              </div>

              <select class="campo campo--pequeno" title="Mover a otra ciudad" (change)="mover(persona.id, $event)">
                @for (opcion of servicio.ciudades(); track opcion.id) {
                  <option [value]="opcion.id" [selected]="opcion.id === ciudad.id">{{ opcion.nombre }}</option>
                }
              </select>

              <button type="button" class="boton-icono" title="Eliminar persona" (click)="servicio.eliminarPersona(persona.id)">
                ✕
              </button>
            </li>
          } @empty {
            <li class="vacio">Nadie vive en {{ ciudad.nombre }} todavía.</li>
          }
        </ul>
      } @else {
        <h2 class="panel__titulo">Personas por ciudad</h2>
        <p class="vacio">Elige una ciudad en la lista o haz clic en una ciudad del grafo.</p>
      }
    </section>
  `,
})
export class Personas {
  servicio = inject(GrafoServicio);

  mover(idPersona: string, evento: Event): void {
    this.servicio.moverPersona(idPersona, (evento.target as HTMLSelectElement).value);
  }
}
