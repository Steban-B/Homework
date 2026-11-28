import { Producto } from '../modelos/producto';
import { MinHeap } from './min-heap';

class NodoTrie {
  hijos: Record<string, NodoTrie> = {};
  esFinDePalabra = false;
  producto: Producto | null = null;
}

const porPopularidad = (a: Producto, b: Producto) => a.popularidad - b.popularidad || b.nombre.localeCompare(a.nombre);

export class Trie {
  private raiz = new NodoTrie();
  private cantidad = 0;

  normalizar(texto: string): string {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  }

  insertar(producto: Producto): boolean {
    const palabra = this.normalizar(producto.nombre);
    if (!palabra) return false;

    let actual = this.raiz;
    for (const letra of palabra) {
      if (!actual.hijos[letra]) actual.hijos[letra] = new NodoTrie();
      actual = actual.hijos[letra];
    }

    if (actual.esFinDePalabra) return false;

    actual.esFinDePalabra = true;
    actual.producto = producto;
    this.cantidad++;
    return true;
  }

  private buscarNodo(texto: string): NodoTrie | null {
    let actual = this.raiz;
    for (const letra of texto) {
      if (!actual.hijos[letra]) return null;
      actual = actual.hijos[letra];
    }
    return actual;
  }

  buscar(nombre: string): boolean {
    const nodo = this.buscarNodo(this.normalizar(nombre));
    return nodo !== null && nodo.esFinDePalabra;
  }

  obtener(nombre: string): Producto | null {
    const nodo = this.buscarNodo(this.normalizar(nombre));
    return nodo && nodo.esFinDePalabra ? nodo.producto : null;
  }

  buscarPrefijo(prefijo: string): Producto[] {
    const nodo = this.buscarNodo(this.normalizar(prefijo));
    if (!nodo) return [];

    const resultado: Producto[] = [];
    this.recolectar(nodo, resultado);
    return resultado;
  }

  private recolectar(nodo: NodoTrie, resultado: Producto[]): void {
    if (nodo.esFinDePalabra && nodo.producto) resultado.push(nodo.producto);

    for (const letra of Object.keys(nodo.hijos).sort()) {
      this.recolectar(nodo.hijos[letra], resultado);
    }
  }

  heapTopK(prefijo: string, k: number): MinHeap<Producto> {
    const heap = new MinHeap<Producto>(porPopularidad);
    if (k <= 0) return heap;

    for (const producto of this.buscarPrefijo(prefijo)) {
      if (heap.tamano() < k) {
        heap.insertar(producto);
      } else if (porPopularidad(producto, heap.peek()!) > 0) {
        heap.extraerMin();
        heap.insertar(producto);
      }
    }

    return heap;
  }

  buscarTopK(prefijo: string, k: number): Producto[] {
    const heap = this.heapTopK(prefijo, k);
    const top: Producto[] = [];

    while (!heap.estaVacio()) {
      top.unshift(heap.extraerMin()!);
    }
    return top;
  }

  tamano(): number {
    return this.cantidad;
  }
}
