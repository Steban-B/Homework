import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../turno-model/turno-model';

@Component({
  selector: 'app-turno',
  standalone: true,
  imports: [],
  templateUrl: './turno.html',
  styleUrl: './turno.css'
})
export class TurnoComponent {
  @Input() turnoActual: Turno | null = null;
  @Input() turnos: Turno[] = [];
  @Output() avanzarTurno = new EventEmitter<void>();

  avanzar(): void {
    this.avanzarTurno.emit();
  }
}