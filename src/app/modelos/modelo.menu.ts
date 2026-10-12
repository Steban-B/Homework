import { Type } from '@angular/core';

export interface ItemMenu {
  titulo: string;
  enlace: string;
  componente: Type<unknown>;
  hijos: ItemMenu[];
}

export function crearItem(titulo: string, enlace: string, componente: Type<unknown>): ItemMenu {
  return { titulo, enlace, componente, hijos: [] };
}