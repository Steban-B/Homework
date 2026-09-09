import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaService } from '../services/clinica';

@Component({
  selector: 'app-comite',
  imports: [CommonModule],
  template: `
    <section class="tarjeta">
      <h3>Comité administrativo <span class="contador">({{ clinica.listaComite.obtenerArreglo().length }} miembros)</span></h3>
      <div class="valor-actual">
        <p>{{ clinica.listaComite.actual?.nombre }}</p>
      </div>
      <div class="botones">
        <button (click)="clinica.retrocederComite()">Anterior</button>
        <button (click)="clinica.avanzarComite()">Siguiente</button>
      </div>
    </section>
  `
})
export class Comite {
  constructor(public clinica: ClinicaService) {}
}