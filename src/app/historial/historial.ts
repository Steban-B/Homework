import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaService } from '../services/clinica';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  template: `
  <section class="tarjeta">
    <h3>Historial de atencion <span class="contador">({{ clinica.listaHistorial.longitud }} pacientes atendidos)</span></h3>

    <div class="valor-actual" *ngIf="clinica.listaHistorial.actual">
      <p>{{ clinica.listaHistorial.actual.paciente }}</p>
      <small>Atendido por {{ clinica.listaHistorial.actual.medico }}</small><br>
      <small>{{ clinica.listaHistorial.actual.fecha | date:'short' }}</small>
    </div>
    <p *ngIf="!clinica.listaHistorial.actual" class="vacio">Aún no se ha atendido a nadie</p>

    <div class="botones" *ngIf="clinica.listaHistorial.actual">
      <button (click)="clinica.listaHistorial.retroceder()" [disabled]="!clinica.listaHistorial.actual.anterior">
        Anterior
      </button>
      <button (click)="clinica.listaHistorial.avanzar()" [disabled]="!clinica.listaHistorial.actual.siguiente">
        Siguiente
      </button>
    </div>
  </section>
`
})
export class Historial {
  constructor(public clinica: ClinicaService) {}
}