import { Component } from '@angular/core';
import { Formulario } from './formulario/formulario';
import { Lista } from './lista/lista';
import { Estudiante } from './estudiante/estudiante';
import { ListaEnlazada } from './lista-enlazada/lista-enlazada';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Formulario, Lista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private listaEnlazada = new ListaEnlazada();
  estudiantes: Estudiante[] = [];

  onAgregarEstudiante(estudiante: Estudiante): void {
    this.listaEnlazada.agregar(estudiante);
    this.actualizarLista();
  }

  onEliminarEstudiante(codigo: string): void {
    this.listaEnlazada.eliminar(codigo);
    this.actualizarLista();
  }

  private actualizarLista(): void {
    this.estudiantes = this.listaEnlazada.aArray();
  }
}