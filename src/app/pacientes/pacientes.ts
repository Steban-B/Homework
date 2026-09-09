import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicaService } from '../services/clinica';

@Component({
  selector: 'app-pacientes',
  imports: [CommonModule, FormsModule],
  template: `
  <section class="tarjeta">
    <h3>Pacientes en espera <span class="contador">{{ clinica.listaPacientes.longitud }}</span></h3>
    <div class="fila-input">
      <input [(ngModel)]="nombreNuevo" placeholder="Nombre del paciente" />
      <button (click)="clinica.agregarPaciente(nombreNuevo); nombreNuevo = ''">Agregar</button>
    </div>
    <ol *ngIf="clinica.listaPacientes.obtenerArreglo().length">
      <li *ngFor="let p of clinica.listaPacientes.obtenerArreglo()">{{ p }}</li>
    </ol>
    <p *ngIf="!clinica.listaPacientes.obtenerArreglo().length" class="vacio">Sin pacientes en espera</p>
    <button (click)="clinica.atenderPaciente()" [disabled]="clinica.listaPacientes.longitud === 0">
      Atender siguiente
    </button>
  </section>
`
})
export class Pacientes {
  nombreNuevo = '';
  constructor(public clinica: ClinicaService) {}
}