import { Cancion } from '../modelos/cancion';

export class MaxHeap {
  private heap: Cancion[] = [];

  private padre(i: number): number { return Math.floor((i - 1) / 2); }
  private izquierdo(i: number): number { return 2 * i + 1; }
  private derecho(i: number): number { return 2 * i + 2; }

  private intercambiar(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // insertar
  insertar(cancion: Cancion): void {
    this.heap.push(cancion);
    this.subir(this.heap.length - 1);
  }

  // sacar la mas escuchada
  extraerMax(): Cancion | null {
    if (this.estaVacio()) return null;

    const max = this.heap[0];
    const ultimo = this.heap.pop()!;

    if (!this.estaVacio()) {
      this.heap[0] = ultimo;
      this.bajar(0);
    }
    return max;
  }

  peek(): Cancion | null {
    return this.heap[0] ?? null;
  }

  tamano(): number {
    return this.heap.length;
  }

  estaVacio(): boolean {
    return this.heap.length === 0;
  }

  aArreglo(): Cancion[] {
    return [...this.heap];
  }

  // top k sin dañar el heap original
  topK(k: number): Cancion[] {
    const copia = new MaxHeap();
    copia.heap = [...this.heap];

    const top: Cancion[] = [];
    while (top.length < k && !copia.estaVacio()) {
      top.push(copia.extraerMax()!);
    }
    return top;
  }

  // sumar reproducciones
    reproducir(id: number, cantidad = 1): void {
    const i = this.heap.findIndex(c => c.id === id);
    if (i === -1) return;

    this.heap[i].reproducciones += cantidad;
    this.subir(i);
  }

  private subir(i: number): void {
    while (i > 0 && this.heap[this.padre(i)].reproducciones < this.heap[i].reproducciones) {
      this.intercambiar(i, this.padre(i));
      i = this.padre(i);
    }
  }

  private bajar(i: number): void {
    const n = this.heap.length;

    while (true) {
      let mayor = i;
      const izq = this.izquierdo(i);
      const der = this.derecho(i);

      if (izq < n && this.heap[izq].reproducciones > this.heap[mayor].reproducciones) mayor = izq;
      if (der < n && this.heap[der].reproducciones > this.heap[mayor].reproducciones) mayor = der;

      if (mayor === i) break;

      this.intercambiar(i, mayor);
      i = mayor;
    }
  }
}