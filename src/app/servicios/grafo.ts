import { Injectable, computed, signal } from '@angular/core';
import { Grafo } from '../metodos/grafo';
import { Arista, Nodo, TipoNodo } from '../modelos/nodo';

export interface Resultado {
  ok: boolean;
  mensaje: string;
}

const normalizar = (texto: string) =>
  texto.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

@Injectable({
  providedIn: 'root',
})
export class GrafoServicio {
  private grafo = new Grafo();
  private contador = 0;

  readonly nodos = signal<Nodo[]>([]);
  readonly aristas = signal<Arista[]>([]);
  readonly ciudadSeleccionada = signal<string | null>(null);

  readonly ciudades = computed(() =>
    this.nodos()
      .filter((nodo) => nodo.tipo === 'ciudad')
      .map((ciudad) => ({ ...ciudad, habitantes: this.grafo.personasEnCiudad(ciudad.id).length })),
  );

  readonly totalPersonas = computed(() => this.nodos().filter((nodo) => nodo.tipo === 'persona').length);

  readonly ciudadActual = computed(() => {
    const id = this.ciudadSeleccionada();
    this.nodos();
    return id ? (this.grafo.buscarNodo(id) ?? null) : null;
  });

  readonly personasDeCiudad = computed(() => {
    const ciudad = this.ciudadActual();
    return ciudad ? this.grafo.personasEnCiudad(ciudad.id) : [];
  });

  readonly adyacencia = computed(() =>
    this.nodos().map((nodo) => ({ nodo, vecinos: this.grafo.obtenerAdyacentes(nodo.id) })),
  );

  constructor() {
    this.cargarDatosDePrueba();
  }

  private actualizar(): void {
    this.nodos.set(this.grafo.obtenerNodos());
    this.aristas.set(this.grafo.obtenerAristas());
  }

  private crearId(tipo: TipoNodo): string {
    this.contador++;
    return `${tipo === 'ciudad' ? 'c' : 'p'}${this.contador}`;
  }

  private buscarCiudadPorNombre(nombre: string): Nodo | undefined {
    return this.grafo
      .obtenerNodos()
      .find((nodo) => nodo.tipo === 'ciudad' && normalizar(nodo.nombre) === normalizar(nombre));
  }

  agregarCiudad(nombre: string): Resultado {
    const limpio = nombre.trim();
    if (!limpio) return { ok: false, mensaje: 'Escribe el nombre de la ciudad.' };
    const repetida = this.buscarCiudadPorNombre(limpio);
    if (repetida) return { ok: false, mensaje: `${repetida.nombre} ya está en el grafo.` };

    this.grafo.agregarNodo({ id: this.crearId('ciudad'), tipo: 'ciudad', nombre: limpio });
    this.actualizar();
    return { ok: true, mensaje: `Ciudad ${limpio} agregada.` };
  }

  agregarPersona(nombre: string, edad: number, idCiudad: string): Resultado {
    const limpio = nombre.trim();
    if (!limpio) return { ok: false, mensaje: 'Escribe el nombre de la persona.' };
    if (!Number.isInteger(edad) || edad < 1 || edad > 120) return { ok: false, mensaje: 'La edad no es válida.' };

    const ciudad = this.grafo.buscarNodo(idCiudad);
    if (!ciudad || ciudad.tipo !== 'ciudad') return { ok: false, mensaje: 'Elige una ciudad.' };

    const id = this.crearId('persona');
    this.grafo.agregarNodo({ id, tipo: 'persona', nombre: limpio, edad });
    this.grafo.agregarArista(id, idCiudad);
    this.actualizar();
    return { ok: true, mensaje: `${limpio} ahora vive en ${ciudad.nombre}.` };
  }

  moverPersona(idPersona: string, idCiudadNueva: string): void {
    const anterior = this.grafo.ciudadDePersona(idPersona);
    if (anterior?.id === idCiudadNueva) return;

    if (anterior) this.grafo.eliminarArista(idPersona, anterior.id);
    this.grafo.agregarArista(idPersona, idCiudadNueva);
    this.actualizar();
  }

  eliminarPersona(id: string): void {
    this.grafo.eliminarNodo(id);
    this.actualizar();
  }

  eliminarCiudad(id: string): void {
    if (this.grafo.personasEnCiudad(id).length > 0) return;

    this.grafo.eliminarNodo(id);
    if (this.ciudadSeleccionada() === id) this.ciudadSeleccionada.set(null);
    this.actualizar();
  }

  seleccionarCiudad(id: string): void {
    this.ciudadSeleccionada.update((actual) => (actual === id ? null : id));
  }

  private cargarDatosDePrueba(): void {
    const ciudades = ['Cali', 'Bogotá', 'Medellín', 'Barranquilla', 'Pasto'];
    const ids = new Map<string, string>();

    for (const nombre of ciudades) {
      const id = this.crearId('ciudad');
      ids.set(nombre, id);
      this.grafo.agregarNodo({ id, tipo: 'ciudad', nombre });
    }

    const personas: [string, number, string][] = [
      ['Valentina', 19, 'Cali'],
      ['Kim Jong-un', 42, 'Cali'],
      ['Isabella', 34, 'Cali'],
      ['Sebastián', 27, 'Cali'],
      ['Xi Jinping', 73, 'Bogotá'],
      ['Laura', 60, 'Bogotá'],
      ['Mateo', 36, 'Bogotá'],
      ['Benjamín Netanyahu', 77, 'Medellín'],
      ['Daniela', 52, 'Medellín'],
      ['Vladimir Putin', 74, 'Barranquilla'],
      ['Sofía', 23, 'Barranquilla'],
      ['Donald Trump', 80, 'Pasto'],
    ];

    for (const [nombre, edad, ciudad] of personas) {
      const id = this.crearId('persona');
      this.grafo.agregarNodo({ id, tipo: 'persona', nombre, edad });
      this.grafo.agregarArista(id, ids.get(ciudad)!);
    }

    this.actualizar();
    this.ciudadSeleccionada.set(ids.get('Cali')!);
  }
}
