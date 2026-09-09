import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaService } from '../services/clinica';

@Component({
  selector: 'app-medicos',
  imports: [CommonModule],
  template: `
  <section class="tarjeta">
    <h3>Médico de guardia</h3>
    <div class="valor-actual">
      <p>{{ clinica.listaMedicos.actual?.nombre }}</p>
      <small>Siguiente: {{ clinica.listaMedicos.verSiguiente() }}</small>
    </div>
    <div class="centrado">
      <button (click)="clinica.rotarMedico()">Rotar ahora</button>
    </div>
  </section>
`
})
export class Medicos {
  constructor(public clinica: ClinicaService) {}
}