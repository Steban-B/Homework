export class Pila<T> {
  private elementos: T[] = [];

  /** Agrega un elemento encima de la pila */
  push(elemento: T): void {
    this.elementos.push(elemento);
  }

  /** Quita y devuelve el elemento de arriba. Si está vacía, devuelve undefined */
  pop(): T | undefined {
    return this.elementos.pop();
  }

  /** Devuelve el elemento de arriba SIN quitarlo */
  peek(): T | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  /** true si la pila no tiene elementos */
  estaVacia(): boolean {
    return this.elementos.length === 0;
  }

  /** Cantidad de elementos en la pila */
  tamano(): number {
    return this.elementos.length;
  }

  /** Copia de los elementos, de la base al tope (para mostrar en pantalla) */
  aArreglo(): T[] {
    return [...this.elementos];
  }
}