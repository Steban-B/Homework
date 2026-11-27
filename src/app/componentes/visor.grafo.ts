import { Component, DestroyRef, ElementRef, effect, inject, input, output, untracked, viewChild } from '@angular/core';
import * as d3 from 'd3';
import { Arista, Nodo } from '../modelos/nodo';

interface NodoVisual extends Nodo, d3.SimulationNodeDatum {}

interface EnlaceVisual extends d3.SimulationLinkDatum<NodoVisual> {
  origen: string;
  destino: string;
}

const ALTO = 500;
const radio = (nodo: Nodo) => (nodo.tipo === 'ciudad' ? 24 : 15);

@Component({
  selector: 'app-visor-grafo',
  template: `
    <section class="panel panel--grafo">
      <div class="panel__cabecera">
        <h2 class="panel__titulo">Grafo</h2>
        <div class="leyenda">
          <span class="leyenda__item"><span class="leyenda__punto leyenda__punto--ciudad"></span>Ciudad</span>
          <span class="leyenda__item"><span class="leyenda__punto leyenda__punto--persona"></span>Persona</span>
          <span class="leyenda__ayuda">Arrastra los nodos o haz clic en una ciudad</span>
        </div>
      </div>
      <div class="visor" #contenedor></div>
    </section>
  `,
})
export class VisorGrafo {
  nodos = input.required<Nodo[]>();
  aristas = input.required<Arista[]>();
  seleccionada = input<string | null>(null);
  elegirCiudad = output<string>();

  private contenedor = viewChild<ElementRef<HTMLDivElement>>('contenedor');
  private simulacion: d3.Simulation<NodoVisual, EnlaceVisual> | null = null;
  private posiciones = new Map<string, { x: number; y: number }>();

  constructor() {
    effect(() => {
      const contenedor = this.contenedor();
      const nodos = this.nodos();
      const aristas = this.aristas();
      if (!contenedor) return;

      this.dibujar(contenedor.nativeElement, nodos, aristas);
      untracked(() => this.resaltar(contenedor.nativeElement, this.seleccionada(), aristas));
    });

    effect(() => {
      const contenedor = this.contenedor();
      const seleccionada = this.seleccionada();
      if (!contenedor) return;

      this.resaltar(contenedor.nativeElement, seleccionada, untracked(this.aristas));
    });

    inject(DestroyRef).onDestroy(() => this.simulacion?.stop());
  }

  private dibujar(elemento: HTMLDivElement, nodos: Nodo[], aristas: Arista[]): void {
    this.simulacion?.stop();

    const ancho = elemento.clientWidth || 800;
    const ids = new Set(nodos.map((nodo) => nodo.id));
    for (const id of this.posiciones.keys()) {
      if (!ids.has(id)) this.posiciones.delete(id);
    }
    const hayNuevos = nodos.some((nodo) => !this.posiciones.has(nodo.id));

    d3.select(elemento).selectAll('*').remove();

    const svg = d3
      .select(elemento)
      .append('svg')
      .attr('viewBox', `0 0 ${ancho} ${ALTO}`)
      .attr('width', '100%')
      .attr('height', ALTO);

    const datosNodos: NodoVisual[] = nodos.map((nodo) => {
      const guardada = this.posiciones.get(nodo.id);
      return {
        ...nodo,
        x: guardada?.x ?? ancho / 2 + (Math.random() - 0.5) * 120,
        y: guardada?.y ?? ALTO / 2 + (Math.random() - 0.5) * 120,
      };
    });

    const datosEnlaces: EnlaceVisual[] = aristas.map((arista) => ({
      source: arista.origen,
      target: arista.destino,
      origen: arista.origen,
      destino: arista.destino,
    }));

    const lineas = svg
      .append('g')
      .selectAll<SVGLineElement, EnlaceVisual>('line')
      .data(datosEnlaces)
      .join('line')
      .attr('class', 'enlace');

    const grupos = svg
      .append('g')
      .selectAll<SVGGElement, NodoVisual>('g')
      .data(datosNodos, (nodo) => nodo.id)
      .join('g')
      .attr('class', (nodo) => `nodo nodo--${nodo.tipo}`)
      .on('click', (_evento, nodo) => {
        if (nodo.tipo === 'ciudad') this.elegirCiudad.emit(nodo.id);
      })
      .call(this.arrastre());

    grupos.append('circle').attr('r', radio);

    grupos
      .append('text')
      .attr('class', 'nodo__inicial')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text((nodo) => nodo.nombre.charAt(0));

    grupos
      .append('text')
      .attr('class', 'nodo__nombre')
      .attr('text-anchor', 'middle')
      .attr('dy', (nodo) => radio(nodo) + 15)
      .text((nodo) => nodo.nombre);

    grupos.append('title').text((nodo) => (nodo.tipo === 'persona' ? `${nodo.nombre}, ${nodo.edad} años` : nodo.nombre));

    this.simulacion = d3
      .forceSimulation(datosNodos)
      .force(
        'enlace',
        d3
          .forceLink<NodoVisual, EnlaceVisual>(datosEnlaces)
          .id((nodo) => nodo.id)
          .distance(75),
      )
      .force('carga', d3.forceManyBody().strength(-260))
      .force('centro', d3.forceCenter(ancho / 2, ALTO / 2))
      .force('choque', d3.forceCollide<NodoVisual>().radius((nodo) => radio(nodo) + 16))
      .force('x', d3.forceX(ancho / 2).strength(0.04))
      .force('y', d3.forceY(ALTO / 2).strength(0.07))
      .alpha(hayNuevos ? 1 : 0.3)
      .on('tick', () => {
        for (const nodo of datosNodos) {
          const margen = radio(nodo) + 4;
          nodo.x = Math.max(margen, Math.min(ancho - margen, nodo.x!));
          nodo.y = Math.max(margen, Math.min(ALTO - margen - 18, nodo.y!));
          this.posiciones.set(nodo.id, { x: nodo.x, y: nodo.y });
        }

        lineas
          .attr('x1', (enlace) => (enlace.source as NodoVisual).x!)
          .attr('y1', (enlace) => (enlace.source as NodoVisual).y!)
          .attr('x2', (enlace) => (enlace.target as NodoVisual).x!)
          .attr('y2', (enlace) => (enlace.target as NodoVisual).y!);

        grupos.attr('transform', (nodo) => `translate(${nodo.x},${nodo.y})`);
      });
  }

  private arrastre() {
    return d3
      .drag<SVGGElement, NodoVisual>()
      .on('start', (evento, nodo) => {
        if (!evento.active) this.simulacion?.alphaTarget(0.3).restart();
        nodo.fx = nodo.x;
        nodo.fy = nodo.y;
      })
      .on('drag', (evento, nodo) => {
        nodo.fx = evento.x;
        nodo.fy = evento.y;
      })
      .on('end', (evento, nodo) => {
        if (!evento.active) this.simulacion?.alphaTarget(0);
        nodo.fx = null;
        nodo.fy = null;
      });
  }

  private resaltar(elemento: HTMLDivElement, idCiudad: string | null, aristas: Arista[]): void {
    const relacionados = new Set<string>();

    if (idCiudad) {
      relacionados.add(idCiudad);
      for (const arista of aristas) {
        if (arista.origen === idCiudad) relacionados.add(arista.destino);
        if (arista.destino === idCiudad) relacionados.add(arista.origen);
      }
    }

    const tocaCiudad = (enlace: EnlaceVisual) => enlace.origen === idCiudad || enlace.destino === idCiudad;
    const svg = d3.select(elemento).select('svg');

    svg
      .selectAll<SVGGElement, NodoVisual>('g.nodo')
      .classed('nodo--seleccionado', (nodo) => nodo.id === idCiudad)
      .classed('nodo--apagado', (nodo) => !!idCiudad && !relacionados.has(nodo.id));

    svg
      .selectAll<SVGLineElement, EnlaceVisual>('line.enlace')
      .classed('enlace--activo', (enlace) => !!idCiudad && tocaCiudad(enlace))
      .classed('enlace--apagado', (enlace) => !!idCiudad && !tocaCiudad(enlace));
  }
}
