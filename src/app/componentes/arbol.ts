import { Component, signal } from '@angular/core';
import { ArbolBinario } from '../metodos/arbol-binario';
import { NodoArbol } from '../modelos/modelo.nodo';
import { FormularioNumero } from './formulario.numero';
import { VisorArbol } from './visor.arbol';

@Component({
  selector: 'app-arbol',
  imports: [FormularioNumero, VisorArbol],
  template: `
    <app-formulario-numero
      (buscar)="buscarNumero($event)"
      (insertar)="insertarNumero($event)"
      (cargarEjemplo)="cargarEjemplo()"
      (verOrdenes)="alternarOrdenes()"
    />

    @if (mensaje()) {
      <p>{{ mensaje() }}</p>
    }

    @if (mostrarOrdenes()) {
      <div>
        <p><strong>Preorden:</strong> {{ preorden().join(', ') }}</p>
        <p><strong>Inorden:</strong> {{ inorden().join(', ') }}</p>
        <p><strong>Postorden:</strong> {{ postorden().join(', ') }}</p>
      </div>
    }

    <app-visor-arbol [raiz]="raiz()" [resaltado]="resaltado()" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      max-width: 100%;
    }
    p {
      margin: 0;
    }
  `,
})
export class Arbol {
  private arbol = new ArbolBinario();

  raiz = signal<NodoArbol | null>(null);
  preorden = signal<number[]>([]);
  inorden = signal<number[]>([]);
  postorden = signal<number[]>([]);

  mensaje = signal('');
  resaltado = signal<number | null>(null);
  mostrarOrdenes = signal(false);

  insertarNumero(valor: number): void {
    if (this.arbol.buscar(valor)) {
      this.resaltado.set(valor);
      this.mensaje.set(`El ${valor} ya está en el árbol.`);
      return;
    }

    this.arbol.insertar(valor);
    this.resaltado.set(null);
    this.mensaje.set(`Se insertó el ${valor}.`);
    this.actualizar();
  }

  buscarNumero(valor: number): void {
    const existe = this.arbol.buscar(valor);
    this.resaltado.set(existe ? valor : null);
    this.mensaje.set(existe ? `El ${valor} SÍ está en el árbol.` : `El ${valor} NO está en el árbol.`);
  }

  cargarEjemplo(): void {
    this.arbol.vaciar();
    this.arbol.insertarVarios([67, 39, 85, 21, 52, 74, 93, 12, 30, 47, 60, 79, 98]);
    this.resaltado.set(null);
    this.mensaje.set('Se cargó el árbol de ejemplo.');
    this.actualizar();
  }

  alternarOrdenes(): void {
    this.mostrarOrdenes.update((valor) => !valor);
  }

  private actualizar(): void {

    this.raiz.set(structuredClone(this.arbol.raiz));

    this.preorden.set(this.arbol.preorden());
    this.inorden.set(this.arbol.inorden());
    this.postorden.set(this.arbol.postorden());

    console.log('Preorden:', this.preorden().join(', '));
    console.log('Inorden:', this.inorden().join(', '));
    console.log('Postorden:', this.postorden().join(', '));
  }
}