import { Component, ElementRef, effect, input, viewChild } from '@angular/core';
import * as d3 from 'd3';
import { NodoArbol } from '../modelos/modelo.nodo';

interface DatoNodo {
  valor: number;
  fantasma: boolean; 
  hijos: DatoNodo[];
}

@Component({
  selector: 'app-visor-arbol',
  template: `
    @if (!raiz()) {
      <p>El árbol está vacío.</p>
    }
    <div #contenedor class="contenedor"></div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 100%;
    }
    .contenedor {
      overflow-x: auto;
    }
  `,
})
export class VisorArbol {
  raiz = input<NodoArbol | null>(null);
  resaltado = input<number | null>(null);
  contenedor = viewChild<ElementRef<HTMLDivElement>>('contenedor');

  constructor() {
    effect(() => {
      const contenedor = this.contenedor();
      const raiz = this.raiz();
      const resaltado = this.resaltado();

      if (!contenedor) return;
      this.dibujar(contenedor.nativeElement, raiz, resaltado);
    });
  }

  private convertir(nodo: NodoArbol): DatoNodo {
    const hijos: DatoNodo[] = [];

    if (nodo.izquierdo || nodo.derecho) {
      hijos.push(nodo.izquierdo ? this.convertir(nodo.izquierdo) : this.crearFantasma());
      hijos.push(nodo.derecho ? this.convertir(nodo.derecho) : this.crearFantasma());
    }

    return { valor: nodo.valor, fantasma: false, hijos };
  }

  private crearFantasma(): DatoNodo {
    return { valor: 0, fantasma: true, hijos: [] };
  }

  private dibujar(elemento: HTMLDivElement, raiz: NodoArbol | null, resaltado: number | null): void {
    d3.select(elemento).selectAll('*').remove();
    if (!raiz) return;

    const jerarquia = d3.hierarchy<DatoNodo>(this.convertir(raiz), (dato) =>
      dato.hijos.length ? dato.hijos : null
    );

    const arbol = d3.tree<DatoNodo>().nodeSize([44, 70])(jerarquia);

    const nodos = arbol.descendants().filter((nodo) => !nodo.data.fantasma);
    const enlaces = arbol.links().filter((enlace) => !enlace.target.data.fantasma);

    const minX = d3.min(nodos, (nodo) => nodo.x) ?? 0;
    const maxX = d3.max(nodos, (nodo) => nodo.x) ?? 0;
    const maxY = d3.max(nodos, (nodo) => nodo.y) ?? 0;
    const ancho = maxX - minX + 50;
    const alto = maxY + 50;

    const svg = d3
      .select(elemento)
      .append('svg')
      .attr('viewBox', `${minX - 25} -25 ${ancho} ${alto}`)
      .attr('width', ancho)
      .attr('height', alto);

    svg
      .append('g')
      .selectAll('line')
      .data(enlaces)
      .join('line')
      .attr('x1', (enlace) => enlace.source.x)
      .attr('y1', (enlace) => enlace.source.y)
      .attr('x2', (enlace) => enlace.target.x)
      .attr('y2', (enlace) => enlace.target.y)
      .attr('stroke', 'black');

    const grupos = svg
      .append('g')
      .selectAll('g')
      .data(nodos)
      .join('g')
      .attr('transform', (nodo) => `translate(${nodo.x},${nodo.y})`);

    grupos
      .append('circle')
      .attr('r', 17)
      .attr('fill', (nodo) => (nodo.data.valor === resaltado ? 'yellow' : 'white'))
      .attr('stroke', 'black');

    grupos
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'black')
      .style('font-size', '13px')
      .text((nodo) => nodo.data.valor);
  }
}