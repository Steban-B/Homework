import { NodoArbol } from '../modelos/modelo.nodo';

export class ArbolBinario {
  raiz: NodoArbol | null = null;

  insertar(valor: number): void {
    this.raiz = this.insertarEn(this.raiz, valor);
  }

  private insertarEn(nodo: NodoArbol | null, valor: number): NodoArbol {

    if (nodo === null) {
      return { valor, izquierdo: null, derecho: null };
    }

    if (valor < nodo.valor) {
      nodo.izquierdo = this.insertarEn(nodo.izquierdo, valor);
    } else if (valor > nodo.valor) {
      nodo.derecho = this.insertarEn(nodo.derecho, valor);
    }

    return nodo;
  }

  insertarVarios(valores: number[]): void {
    valores.forEach((valor) => this.insertar(valor));
  }

  buscar(valor: number): boolean {
    return this.buscarEn(this.raiz, valor);
  }

  private buscarEn(nodo: NodoArbol | null, valor: number): boolean {
    if (nodo === null) {
      return false; 
    }
    if (valor === nodo.valor) {
      return true;
    }

    return valor < nodo.valor
      ? this.buscarEn(nodo.izquierdo, valor)
      : this.buscarEn(nodo.derecho, valor);
  }

  preorden(): number[] {
    const resultado: number[] = [];
    this.recorrerPreorden(this.raiz, resultado);
    return resultado;
  }

  private recorrerPreorden(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo === null) return;
    resultado.push(nodo.valor);                        
    this.recorrerPreorden(nodo.izquierdo, resultado);   
    this.recorrerPreorden(nodo.derecho, resultado);     
  }

  inorden(): number[] {
    const resultado: number[] = [];
    this.recorrerInorden(this.raiz, resultado);
    return resultado;
  }

  private recorrerInorden(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo === null) return;
    this.recorrerInorden(nodo.izquierdo, resultado);    
    resultado.push(nodo.valor);                        
    this.recorrerInorden(nodo.derecho, resultado);      
  }

  postorden(): number[] {
    const resultado: number[] = [];
    this.recorrerPostorden(this.raiz, resultado);
    return resultado;
  }

  private recorrerPostorden(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo === null) return;
    this.recorrerPostorden(nodo.izquierdo, resultado); 
    this.recorrerPostorden(nodo.derecho, resultado);    
    resultado.push(nodo.valor);                         
  }

  vaciar(): void {
    this.raiz = null;
  }
}