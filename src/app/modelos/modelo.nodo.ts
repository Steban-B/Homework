export interface NodoArbol {
  valor: number;
  izquierdo: NodoArbol | null;
  derecho: NodoArbol | null;
}