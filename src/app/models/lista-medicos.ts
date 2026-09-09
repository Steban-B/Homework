export class NodoMedico {
  nombre: string;
  siguiente: NodoMedico | null = null;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

export class ListaMedicosCircular {
  cabeza: NodoMedico | null = null;
  cola: NodoMedico | null = null;
  actual: NodoMedico | null = null;

  agregar(nombre: string): void {
    const nodoNuevo = new NodoMedico(nombre);
    if (!this.cabeza) {
      this.cabeza = nodoNuevo;
      nodoNuevo.siguiente = nodoNuevo;
      this.cola = nodoNuevo;
      this.actual = nodoNuevo;
      return;
    }
    nodoNuevo.siguiente = this.cabeza;
    this.cola!.siguiente = nodoNuevo;
    this.cola = nodoNuevo;
  }

  rotar(): void {
    if (this.actual) this.actual = this.actual.siguiente;
  }

  verSiguiente(): string {
  if (!this.actual) return '';
  return this.actual.siguiente!.nombre;
}

  obtenerArreglo(): string[] {
    const resultado: string[] = [];
    let nodo = this.cabeza;
    if (!nodo) return resultado;
    do {
      resultado.push(nodo.nombre);
      nodo = nodo.siguiente!;
    } while (nodo !== this.cabeza);
    return resultado;
  }
}