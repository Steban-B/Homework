import { Cancion } from '../modelos/cancion';

class NodoTrie {
  hijos: { [letra: string]: NodoTrie } = {};
  esFinDePalabra = false;
  cancion: Cancion | null = null;
}

export class Trie {
  private raiz = new NodoTrie();

  private normalizar(texto: string): string {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  // insertar
  insertar(cancion: Cancion): void {
    const palabra = this.normalizar(cancion.titulo);
    let actual = this.raiz;

    for (const letra of palabra) {
      if (!actual.hijos[letra]) {
        actual.hijos[letra] = new NodoTrie();
      }
      actual = actual.hijos[letra];
    }

    actual.esFinDePalabra = true;
    actual.cancion = cancion;
  }

  private buscarNodo(texto: string): NodoTrie | null {
    let actual = this.raiz;
    for (const letra of texto) {
      if (!actual.hijos[letra]) return null;
      actual = actual.hijos[letra];
    }
    return actual;
  }

  // buscar
  buscar(titulo: string): boolean {
    const nodo = this.buscarNodo(this.normalizar(titulo));
    return nodo !== null && nodo.esFinDePalabra;
  }

  obtener(titulo: string): Cancion | null {
    const nodo = this.buscarNodo(this.normalizar(titulo));
    return nodo && nodo.esFinDePalabra ? nodo.cancion : null;
  }

  // sugerencias por prefijo
  sugerencias(prefijo: string, limite = 5): Cancion[] {
    const texto = this.normalizar(prefijo);
    if (!texto) return [];

    const nodo = this.buscarNodo(texto);
    if (!nodo) return [];

    const resultado: Cancion[] = [];
    this.recolectar(nodo, resultado, limite);
    return resultado;
  }

  private recolectar(nodo: NodoTrie, resultado: Cancion[], limite: number): void {
    if (resultado.length >= limite) return;

    if (nodo.esFinDePalabra && nodo.cancion) {
      resultado.push(nodo.cancion);
    }

    for (const letra of Object.keys(nodo.hijos).sort()) {
      this.recolectar(nodo.hijos[letra], resultado, limite);
    }
  }
}