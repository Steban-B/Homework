import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../estudiante/estudiante';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
  nombre = '';
  edad: number | null = null;
  codigo = '';

  @Output() agregarEstudiante = new EventEmitter<Estudiante>();

  registrar(): void {
    if (!this.nombre.trim() || !this.codigo.trim() || this.edad === null || this.edad <= 0) {
      alert('Completa todos los campos correctamente.');
      return;
    }

    const nuevoEstudiante: Estudiante = {
      nombre: this.nombre.trim(),
      edad: this.edad,
      codigo: this.codigo.trim()
    };

    this.agregarEstudiante.emit(nuevoEstudiante);
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.nombre = '';
    this.edad = null;
    this.codigo = '';
  }
}