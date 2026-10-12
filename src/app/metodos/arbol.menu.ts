import { ItemMenu } from '../modelos/modelo.menu';

export class ArbolMenu {
  constructor(public raiz: ItemMenu) {}

  agregar(enlacePadre: string, item: ItemMenu): void {
    const padre = this.buscar(enlacePadre);
    if (padre) {
      padre.hijos.push(item);
    }
  }

  buscar(enlace: string, nodo: ItemMenu = this.raiz): ItemMenu | undefined {
    if (nodo.enlace === enlace) {
      return nodo;
    }
    for (const hijo of nodo.hijos) {
      const encontrado = this.buscar(enlace, hijo);
      if (encontrado) {
        return encontrado;
      }
    }
    return undefined;
  }
}