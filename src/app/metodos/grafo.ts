import { Arista, Nodo } from '../modelos/nodo';

export class Grafo {
  private nodos: Nodo[] = [];
  private listaAdyacencia: Record<string, string[]> = {};

  agregarNodo(nodo: Nodo): boolean {
    if (this.buscarNodo(nodo.id)) return false;

    this.nodos.push(nodo);
    this.listaAdyacencia[nodo.id] = [];
    return true;
  }

  buscarNodo(id: string): Nodo | undefined {
    if (this.estaVacio()) return undefined;
    return this.nodos.find((nodo) => nodo.id === id);
  }

  agregarArista(id1: string, id2: string): boolean {
    if (id1 === id2 || !this.buscarNodo(id1) || !this.buscarNodo(id2)) return false;
    if (this.listaAdyacencia[id1].includes(id2)) return false;

    this.listaAdyacencia[id1].push(id2);
    this.listaAdyacencia[id2].push(id1);
    return true;
  }

  eliminarArista(id1: string, id2: string): void {
    if (!this.buscarNodo(id1) || !this.buscarNodo(id2)) return;

    this.listaAdyacencia[id1] = this.listaAdyacencia[id1].filter((vecino) => vecino !== id2);
    this.listaAdyacencia[id2] = this.listaAdyacencia[id2].filter((vecino) => vecino !== id1);
  }

  eliminarNodo(id: string): boolean {
    if (!this.buscarNodo(id)) return false;

    for (const vecino of this.listaAdyacencia[id]) {
      this.listaAdyacencia[vecino] = this.listaAdyacencia[vecino].filter((v) => v !== id);
    }

    delete this.listaAdyacencia[id];
    this.nodos = this.nodos.filter((nodo) => nodo.id !== id);
    return true;
  }

  obtenerAdyacentes(id: string): Nodo[] {
    const vecinos = this.listaAdyacencia[id] ?? [];
    return vecinos.map((vecino) => this.buscarNodo(vecino)!);
  }

  personasEnCiudad(idCiudad: string): Nodo[] {
    const ciudad = this.buscarNodo(idCiudad);
    if (!ciudad || ciudad.tipo !== 'ciudad') return [];

    return this.obtenerAdyacentes(idCiudad).filter((nodo) => nodo.tipo === 'persona');
  }

  ciudadDePersona(idPersona: string): Nodo | undefined {
    return this.obtenerAdyacentes(idPersona).find((nodo) => nodo.tipo === 'ciudad');
  }

  imprimirAdyacencia(id: string): string {
    const nodo = this.buscarNodo(id);
    if (!nodo) return '';

    const vecinos = this.obtenerAdyacentes(id).map((vecino) => vecino.nombre);
    return `${nodo.nombre} -> [${vecinos.join(', ')}]`;
  }

  imprimir(): string[] {
    return this.nodos.map((nodo) => this.imprimirAdyacencia(nodo.id));
  }

  obtenerNodos(): Nodo[] {
    return [...this.nodos];
  }

  obtenerAristas(): Arista[] {
    const aristas: Arista[] = [];
    const vistos = new Set<string>();

    for (const nodo of this.nodos) {
      for (const vecino of this.listaAdyacencia[nodo.id]) {
        if (vistos.has(vecino)) continue;
        aristas.push({ origen: nodo.id, destino: vecino });
      }
      vistos.add(nodo.id);
    }

    return aristas;
  }

  estaVacio(): boolean {
    return this.nodos.length === 0;
  }

  tamano(): number {
    return this.nodos.length;
  }
}
