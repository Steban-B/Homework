export class NodoComite {
  nombre: string;
  siguiente: NodoComite | null = null;
  anterior: NodoComite | null = null;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

export class ListaComiteCircularDoble {
  cabeza: NodoComite | null = null;
  cola: NodoComite | null = null;
  actual: NodoComite | null = null;

  agregar(nombre: string): void {
    const nodoNuevo = new NodoComite(nombre);
    if (!this.cabeza) {
      this.cabeza = nodoNuevo;
      nodoNuevo.siguiente = nodoNuevo;
      nodoNuevo.anterior = nodoNuevo;
      this.cola = nodoNuevo;
      this.actual = nodoNuevo;
      return;
    }
    nodoNuevo.anterior = this.cola;
    nodoNuevo.siguiente = this.cabeza;
    this.cola!.siguiente = nodoNuevo;
    this.cabeza.anterior = nodoNuevo;
    this.cola = nodoNuevo;
  }

  avanzar(): void {
    if (this.actual) this.actual = this.actual.siguiente;
  }

  retroceder(): void {
    if (this.actual) this.actual = this.actual.anterior;
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