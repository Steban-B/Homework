import { Component } from '@angular/core';
import { Pacientes } from '../pacientes/pacientes';
import { Historial } from '../historial/historial';
import { Medicos } from '../medicos/medicos';
import { Comite } from '../comite/comite';

@Component({
  selector: 'app-clinica',
  imports: [Pacientes, Historial, Medicos, Comite],
  template: `
    <div class="panel">
      <h2>Clinica</h2>
      <app-medicos></app-medicos>
      <app-pacientes></app-pacientes>
      <app-historial></app-historial>
      <app-comite></app-comite>
    </div>
  `
})
export class Clinica {}