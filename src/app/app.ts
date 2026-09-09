import { Component } from '@angular/core';
import { Formulario } from './formulario/formulario';
import { TurnoComponent } from './turno/turno';
import { Turno } from './turno-model/turno-model';
import { ListaCircular } from './lista-circular/lista-circular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Formulario, TurnoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private listaCircular = new ListaCircular();
  private contador = 1; // para asignar el número de turno automáticamente

  turnos: Turno[] = [];
  turnoActual: Turno | null = null;

  onAgregarTurno(nombre: string): void {
    const nuevoTurno: Turno = { numero: this.contador, nombre };
    this.contador++;

    this.listaCircular.agregar(nuevoTurno);
    this.actualizarEstado();
  }

  onAvanzarTurno(): void {
    this.listaCircular.avanzar();
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.turnos = this.listaCircular.aArray();
    this.turnoActual = this.listaCircular.obtenerActual();
  }
}