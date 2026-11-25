import { Cancion } from '../modelos/cancion';

export class Grafo {
  private nodos = new Map<number, Cancion>();
  private listaAdyacencia = new Map<number, number[]>();

  // agregar nodo
  agregarNodo(cancion: Cancion): void {
    if (this.nodos.has(cancion.id)) return;
    this.nodos.set(cancion.id, cancion);
    this.listaAdyacencia.set(cancion.id, []);
  }

  // agregar arista en los dos sentidos
  agregarArista(id1: number, id2: number): void {
    if (id1 === id2) return;
    if (!this.nodos.has(id1) || !this.nodos.has(id2)) return;

    const vecinos1 = this.listaAdyacencia.get(id1)!;
    const vecinos2 = this.listaAdyacencia.get(id2)!;

    if (!vecinos1.includes(id2)) {
      vecinos1.push(id2);
      vecinos2.push(id1);
    }
  }

  buscarNodo(id: number): Cancion | null {
    return this.nodos.get(id) ?? null;
  }

  obtenerAdyacentes(id: number): Cancion[] {
    const vecinos = this.listaAdyacencia.get(id) ?? [];
    return vecinos.map(v => this.nodos.get(v)!);
  }

  eliminarNodo(id: number): void {
    if (!this.nodos.has(id)) return;

    for (const vecino of this.listaAdyacencia.get(id)!) {
      const lista = this.listaAdyacencia.get(vecino)!;
      this.listaAdyacencia.set(vecino, lista.filter(v => v !== id));
    }

    this.listaAdyacencia.delete(id);
    this.nodos.delete(id);
  }

  recomendar(id: number, limite = 5): Cancion[] {
    if (!this.nodos.has(id)) return [];

    const visitados = new Set<number>([id]);
    const cola: number[] = [id];
    const resultado: Cancion[] = [];

    while (cola.length > 0 && resultado.length < limite) {
      const actual = cola.shift()!;

      for (const vecino of this.listaAdyacencia.get(actual)!) {
        if (visitados.has(vecino)) continue;

        visitados.add(vecino);
        cola.push(vecino);
        resultado.push(this.nodos.get(vecino)!);

        if (resultado.length === limite) break;
      }
    }
    return resultado;
  }

  obtenerAristas(): [number, number][] {
    const aristas: [number, number][] = [];
    this.listaAdyacencia.forEach((vecinos, id) => {
      vecinos.forEach(v => {
        if (id < v) aristas.push([id, v]);
      });
    });
    return aristas;
  }

  estaVacio(): boolean {
    return this.nodos.size === 0;
  }

  tamano(): number {
    return this.nodos.size;
  }

  imprimir(): void {
    this.listaAdyacencia.forEach((vecinos, id) => {
      const titulos = vecinos.map(v => this.nodos.get(v)!.titulo).join(', ');
      console.log(`${this.nodos.get(id)!.titulo} -> ${titulos}`);
    });
  }
}