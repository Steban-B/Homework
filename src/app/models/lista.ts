export class Nodo {
  valor: string;
  siguiente: Nodo | null = null;
  constructor(valor: string) {
    this.valor = valor;
  }
}

export class ListaEnlazada {
  cabeza: Nodo | null = null;
  cola: Nodo | null = null;
  longitud = 0;

  agregar(valor: string): void {
    const nodoNuevo = new Nodo(valor);
    if (!this.cabeza) {
      this.cabeza = nodoNuevo;
    } else {
      this.cola!.siguiente = nodoNuevo;
    }
    this.cola = nodoNuevo;
    this.longitud++;
  }

  tamano(): number {
    return this.longitud;
  }

  imprimir(): string[] {
    const resultado: string[] = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }
    return resultado;
  }
}

export class NodoDoble {
  valor: string;
  siguiente: NodoDoble | null = null;
  anterior: NodoDoble | null = null;
  constructor(valor: string) {
    this.valor = valor;
  }
}

export class ListaDoble {
  cabeza: NodoDoble | null = null;
  cola: NodoDoble | null = null;
  longitud = 0;

  agregar(valor: string): void {
    const nodoNuevo = new NodoDoble(valor);
    if (!this.cabeza) {
      this.cabeza = nodoNuevo;
      this.cola = nodoNuevo;
      this.longitud++;
      return;
    }
    this.cola!.siguiente = nodoNuevo;
    nodoNuevo.anterior = this.cola;
    this.cola = nodoNuevo;
    this.longitud++;
  }
}