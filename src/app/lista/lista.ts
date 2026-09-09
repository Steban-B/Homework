import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estudiante } from '../estudiante/estudiante';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista {
  @Input() estudiantes: Estudiante[] = [];
  @Output() eliminarEstudiante = new EventEmitter<string>();

  eliminar(codigo: string): void {
    this.eliminarEstudiante.emit(codigo);
  }
}