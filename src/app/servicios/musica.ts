import { Injectable, signal } from '@angular/core';
import { Cancion } from '../modelos/cancion';
import { CANCIONES } from '../modelos/canciones';
import { RELACIONES } from '../modelos/relaciones';
import { Trie } from '../metodos/trie';
import { MaxHeap } from '../metodos/max-heap';
import { Grafo } from '../metodos/grafo';

@Injectable({ providedIn: 'root' })
export class MusicaServicio {
  private trie = new Trie();
  private heap = new MaxHeap();
  private grafo = new Grafo();
  private lista: Cancion[] = [];

  canciones = signal<Cancion[]>([]);
  busqueda = signal('');
  sugerencias = signal<Cancion[]>([]);
  ranking = signal<Cancion[]>([]);
  topK = signal(5);
  seleccionada = signal<Cancion | null>(null);
  recomendaciones = signal<Cancion[]>([]);

  constructor() {
    this.cargarDatosDePrueba();
  }

  private cargarDatosDePrueba(): void {
    CANCIONES.map(c => ({ ...c })).forEach(c => this.insertarEnEstructuras(c));
    RELACIONES.forEach(([a, b]) => this.grafo.agregarArista(a, b));
    this.actualizar();
  }

  private insertarEnEstructuras(cancion: Cancion): void {
    this.lista.push(cancion);
    this.trie.insertar(cancion);
    this.heap.insertar(cancion);
    this.grafo.agregarNodo(cancion);
  }

  private actualizar(): void {
    this.canciones.set([...this.lista]);
    this.sugerencias.set(this.trie.sugerencias(this.busqueda(), 6));
    this.ranking.set(this.heap.topK(this.topK()));

    const actual = this.seleccionada();
    this.recomendaciones.set(actual ? this.grafo.recomendar(actual.id, 5) : []);
  }

  // trie
  buscar(texto: string): void {
    this.busqueda.set(texto);
    this.actualizar();
  }

  existe(titulo: string): boolean {
    return this.trie.buscar(titulo);
  }

  agregarCancion(datos: Omit<Cancion, 'id'>, relacionadas: number[] = []): boolean {
    if (!datos.titulo.trim() || this.trie.buscar(datos.titulo)) return false;

    const id = Math.max(0, ...this.lista.map(c => c.id)) + 1;
    const nueva: Cancion = { id, ...datos };

    this.insertarEnEstructuras(nueva);
    relacionadas.forEach(r => this.grafo.agregarArista(id, r));
    this.actualizar();
    return true;
  }

  cambiarTop(k: number): void {
    this.topK.set(k);
    this.actualizar();
  }

  formatear(numero: number): string {
    return numero.toLocaleString('es-CO');
  }

  // grafo
  seleccionar(cancion: Cancion): void {
    this.seleccionada.set(cancion);
    this.actualizar();
  }

  buscarPorId(id: number): Cancion | null {
    return this.grafo.buscarNodo(id);
  }
}