import { Component } from '@angular/core';
import { ListaEnlazada, Nodo } from '../models/lista';

@Component({
  selector: 'app-reproductor',
  standalone: false,
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.scss'
})
export class Reproductor {
  listaCanciones = new ListaEnlazada();
  nodoActual: Nodo | null = null;

  constructor() {
  ['Drakukeo - Kidkeo', 'She Dont Give a Fo - Duki', 'After - Conep', 'Freaked Out - Fat Daikoku', 'Topboy']
    .forEach(cancion => this.listaCanciones.agregar(cancion));
  this.nodoActual = this.listaCanciones.cabeza;
}

  irSiguiente(): void {
    if (this.nodoActual?.siguiente) {
      this.nodoActual = this.nodoActual.siguiente;
    }
  }

  reiniciar(): void {
    this.nodoActual = this.listaCanciones.cabeza;
  }
}