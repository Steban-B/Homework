export class Cola<T> {
  private elementos: T[] = [];

  
  constructor(private comparar?: (a: T, b: T) => number) {}
  
  enqueue(elemento: T): void {
    if (!this.comparar) {
      this.elementos.push(elemento);
      return;
    }

    let posicion = this.elementos.findIndex(
      (existente) => this.comparar!(elemento, existente) < 0
    );

    if (posicion === -1) {
      posicion = this.elementos.length; // va al final
    }

    this.elementos.splice(posicion, 0, elemento);
  }

  dequeue(): T | undefined {
    return this.elementos.shift();
  }

  peek(): T | undefined {
    return this.elementos[0];
  }

  estaVacia(): boolean {
    return this.elementos.length === 0;
  }

  tamano(): number {
    return this.elementos.length;
  }

  vaciar(): void {
    this.elementos = [];
  }

  aArreglo(): T[] {
    return [...this.elementos];
  }
}