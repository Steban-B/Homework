import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
  nombre = '';

  @Output() agregarTurno = new EventEmitter<string>();

  registrar(): void {
    if (!this.nombre.trim()) {
      alert('Escribe un nombre.');
      return;
    }
    this.agregarTurno.emit(this.nombre.trim());
    this.nombre = '';
  }
}