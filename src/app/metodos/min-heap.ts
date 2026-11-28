export class MinHeap<T> {
  private heap: T[] = [];

  constructor(private comparar: (a: T, b: T) => number) {}

  private padre(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private izquierdo(i: number): number {
    return 2 * i + 1;
  }

  private derecho(i: number): number {
    return 2 * i + 2;
  }

  private intercambiar(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insertar(valor: T): void {
    this.heap.push(valor);
    this.subir(this.heap.length - 1);
  }

  extraerMin(): T | null {
    if (this.estaVacio()) return null;

    const minimo = this.heap[0];
    const ultimo = this.heap.pop()!;

    if (!this.estaVacio()) {
      this.heap[0] = ultimo;
      this.bajar(0);
    }
    return minimo;
  }

  peek(): T | null {
    return this.heap[0] ?? null;
  }

  heapify(valores: T[]): void {
    this.heap = [...valores];
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.bajar(i);
    }
  }

  tamano(): number {
    return this.heap.length;
  }

  estaVacio(): boolean {
    return this.heap.length === 0;
  }

  aArreglo(): T[] {
    return [...this.heap];
  }

  private subir(i: number): void {
    while (i > 0 && this.comparar(this.heap[i], this.heap[this.padre(i)]) < 0) {
      this.intercambiar(i, this.padre(i));
      i = this.padre(i);
    }
  }

  private bajar(i: number): void {
    const n = this.heap.length;

    while (true) {
      let menor = i;
      const izq = this.izquierdo(i);
      const der = this.derecho(i);

      if (izq < n && this.comparar(this.heap[izq], this.heap[menor]) < 0) menor = izq;
      if (der < n && this.comparar(this.heap[der], this.heap[menor]) < 0) menor = der;

      if (menor === i) break;

      this.intercambiar(i, menor);
      i = menor;
    }
  }
}
