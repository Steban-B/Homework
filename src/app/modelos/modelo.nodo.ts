export type TipoNodo = 'carpeta' | 'archivo';

export interface DatoNodo {
  id: string;
  nombre: string;
  tipo: TipoNodo;
  idPadre: string | null;
  creadoPor: string;
  creada: number;
}

export interface Nodo extends DatoNodo {
  hijos: Nodo[];
}

export class ArbolNodos {
  readonly raiz: Nodo = {
    id: 'raiz',
    nombre: 'Raíz',
    tipo: 'carpeta',
    idPadre: null,
    creadoPor: '',
    creada: 0,
    hijos: [],
  };

  constructor(datos: DatoNodo[] = []) {
    [...datos]
      .sort((a, b) => a.creada - b.creada)
      .forEach((dato) => {
        try {
          this.agregar(dato);
        } catch {
          return;
        }
      });
    this.ordenar(this.raiz);
  }

  buscar(id: string, nodo: Nodo = this.raiz): Nodo | undefined {
    if (nodo.id === id) {
      return nodo;
    }
    for (const hijo of nodo.hijos) {
      const encontrado = this.buscar(id, hijo);
      if (encontrado) {
        return encontrado;
      }
    }
    return undefined;
  }

  validarNuevo(idPadre: string, nombre: string): Nodo {
    const padre = this.buscar(idPadre);
    if (!padre) throw new Error('La carpeta destino no existe.');
    if (padre.tipo === 'archivo') throw new Error('Un archivo no puede tener hijos.');

    const limpio = nombre.trim().toLowerCase();
    if (!limpio) throw new Error('Escribe un nombre.');
    if (padre.hijos.some((hijo) => hijo.nombre.toLowerCase() === limpio)) {
      throw new Error('Ya existe un elemento con ese nombre en esta carpeta.');
    }
    return padre;
  }

  agregar(dato: DatoNodo): void {
    const padre = this.validarNuevo(dato.idPadre ?? this.raiz.id, dato.nombre);
    padre.hijos.push({ ...dato, hijos: [] });
  }

  private ordenar(nodo: Nodo): void {
    nodo.hijos.sort((a, b) => {
      if (a.tipo !== b.tipo) return a.tipo === 'carpeta' ? -1 : 1;
      return a.nombre.localeCompare(b.nombre);
    });
    nodo.hijos.forEach((hijo) => this.ordenar(hijo));
  }
}