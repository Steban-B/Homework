import { Estudiante } from '../estudiante/estudiante';

export class Nodo {
  dato: Estudiante;
  siguiente: Nodo | null = null;

  constructor(dato: Estudiante) {
    this.dato = dato;
  }
}

export class ListaEnlazada {
  private cabeza: Nodo | null = null;

  agregar(estudiante: Estudiante): void {
    const nuevoNodo = new Nodo(estudiante);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      return;
    }

    let actual = this.cabeza;
    while (actual.siguiente) {
      actual = actual.siguiente;
    }
    actual.siguiente = nuevoNodo;
  }

  eliminar(codigo: string): boolean {
    if (!this.cabeza) return false;

    if (this.cabeza.dato.codigo === codigo) {
      this.cabeza = this.cabeza.siguiente;
      return true;
    }

    let actual = this.cabeza;
    while (actual.siguiente) {
      if (actual.siguiente.dato.codigo === codigo) {
        actual.siguiente = actual.siguiente.siguiente;
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }

  aArray(): Estudiante[] {
    const resultado: Estudiante[] = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.dato);
      actual = actual.siguiente;
    }
    return resultado;
  }

  estaVacia(): boolean {
    return this.cabeza === null;
  }
}