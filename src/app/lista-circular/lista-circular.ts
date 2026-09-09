import { Turno } from '../turno-model/turno-model';

export class Nodo {
  dato: Turno;
  siguiente: Nodo | null = null;

  constructor(dato: Turno) {
    this.dato = dato;
  }
}

export class ListaCircular {
  private cabeza: Nodo | null = null;
  private actual: Nodo | null = null; // apunta al turno que está siendo atendido

  agregar(turno: Turno): void {
    const nuevoNodo = new Nodo(turno);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      nuevoNodo.siguiente = nuevoNodo;
      this.actual = nuevoNodo;
      return;
    }

    
    let temp = this.cabeza;
    while (temp.siguiente !== this.cabeza) {
      temp = temp.siguiente!;
    }

    temp.siguiente = nuevoNodo;
    nuevoNodo.siguiente = this.cabeza; 
  }

  avanzar(): Turno | null {
    if (!this.actual) return null;
    this.actual = this.actual.siguiente;
    return this.actual!.dato;
  }

  obtenerActual(): Turno | null {
    return this.actual ? this.actual.dato : null;
  }

  aArray(): Turno[] {
    const resultado: Turno[] = [];
    if (!this.cabeza) return resultado;

    let temp = this.cabeza;
    do {
      resultado.push(temp.dato);
      temp = temp.siguiente!;
    } while (temp !== this.cabeza);

    return resultado;
  }

  estaVacia(): boolean {
    return this.cabeza === null;
  }
}