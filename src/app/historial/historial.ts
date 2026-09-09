import { Component } from '@angular/core';
import { ListaDoble, NodoDoble } from '../models/lista';

@Component({
  selector: 'app-historial',
  standalone: false,
  templateUrl: './historial.html',
  styleUrl: './historial.scss'
})
export class Historial {
  listaPaginas = new ListaDoble();
  nodoActual: NodoDoble | null = null;

  constructor() {
  ['Kingpapa.com', 'Elegir salchipapa', 'Agrega salsas y extras', 'Comprar', '¡Pedido in coming!']
    .forEach(pagina => this.listaPaginas.agregar(pagina));
  this.nodoActual = this.listaPaginas.cabeza;
}

  irAtras(): void {
    if (this.nodoActual?.anterior) {
      this.nodoActual = this.nodoActual.anterior;
    }
  }

  irAdelante(): void {
    if (this.nodoActual?.siguiente) {
      this.nodoActual = this.nodoActual.siguiente;
    }
  }
}