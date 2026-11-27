export type TipoNodo = 'persona' | 'ciudad';

export interface Nodo {
  id: string;
  tipo: TipoNodo;
  nombre: string;
  edad?: number;
}

export interface Arista {
  origen: string;
  destino: string;
}
