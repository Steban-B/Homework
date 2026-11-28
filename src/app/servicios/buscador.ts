import { Injectable, computed, signal } from '@angular/core';
import { Trie } from '../metodos/trie';
import { Producto } from '../modelos/producto';

export interface Resultado {
  ok: boolean;
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class BuscadorServicio {
  private trie = new Trie();
  private contador = 0;

  readonly productos = signal<Producto[]>([]);
  readonly busqueda = signal('');
  readonly k = signal(5);
  readonly opcionesK = [3, 5, 10];

  readonly coincidencias = computed(() => {
    this.productos();
    return this.trie.buscarPrefijo(this.busqueda());
  });

  readonly topK = computed(() => {
    this.productos();
    return this.trie.buscarTopK(this.busqueda(), this.k());
  });

  readonly heap = computed(() => {
    this.productos();
    return this.trie.heapTopK(this.busqueda(), this.k()).aArreglo();
  });

  readonly existeExacto = computed(() => {
    this.productos();
    return this.busqueda().trim() !== '' && this.trie.buscar(this.busqueda());
  });

  readonly catalogo = computed(() => {
    this.productos();
    return this.trie.buscarPrefijo('');
  });

  constructor() {
    this.cargarDatosDePrueba();
  }

  private actualizar(): void {
    this.productos.set(this.trie.buscarPrefijo(''));
  }

  buscar(texto: string): void {
    this.busqueda.set(texto);
  }

  cambiarK(k: number): void {
    this.k.set(k);
  }

  agregar(nombre: string, popularidad: number): Resultado {
    const limpio = nombre.trim().replace(/\s+/g, ' ');
    if (!limpio) return { ok: false, mensaje: 'Escribe el nombre del producto.' };
    if (!Number.isInteger(popularidad) || popularidad < 0 || popularidad > 100) {
      return { ok: false, mensaje: 'La popularidad va de 0 a 100.' };
    }
    const repetido = this.trie.obtener(limpio);
    if (repetido) return { ok: false, mensaje: `${repetido.nombre} ya existe en el buscador.` };

    this.contador++;
    this.trie.insertar({ id: this.contador, nombre: limpio, popularidad });
    this.actualizar();
    return { ok: true, mensaje: `${limpio} agregado con popularidad ${popularidad}.` };
  }

  private cargarDatosDePrueba(): void {
    const datos: [string, number][] = [
      ['Air Force', 95],
      ['Air Max', 90],
      ['Air Jordan', 64],
      ['Air Zoom', 23],
      ['Nike Dunk', 82],
      ['Adidas Samba', 71],
      ['Adidas Superstar', 38],
      ['Adidas Gazelle', 57],
      ['New Balance 550', 46],
      ['New Balance 9060', 88],
      ['Puma Suede', 15],
      ['Puma Palermo', 31],
      ['Vans Old Skool', 52],
      ['Converse Chuck 70', 67],
      ['Asics Gel Kayano', 40],
    ];

    for (const [nombre, popularidad] of datos) {
      this.contador++;
      this.trie.insertar({ id: this.contador, nombre, popularidad });
    }

    this.actualizar();
  }
}
