import { Component, signal } from '@angular/core';
import { ArbolBinario } from '../../metodos/arbol-binario';
import { NodoArbol } from '../../modelos/modelo.nodo';
import { FormularioNumero } from '../formulario-numero/formulario-numero';
import { VisorArbol } from '../visor-arbol/visor-arbol';

@Component({
  selector: 'app-arbol',
  imports: [FormularioNumero, VisorArbol],
  templateUrl: './arbol.html',
  styleUrl: './arbol.css',
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
    this.mensaje.set(
      existe ? `El ${valor} SÍ está en el árbol.` : `El ${valor} NO está en el árbol.`
    );
  }

  cargarEjemplo(): void {
    this.arbol.vaciar();
    this.cargarDatosDePrueba();
    this.mensaje.set('Se cargó el árbol de ejemplo.');
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

  private cargarDatosDePrueba(): void {
    this.arbol.insertarVarios([67, 39, 85, 21, 52, 74, 93, 12, 30, 47, 60, 79, 98]);
    this.resaltado.set(null);
    this.actualizar();
  }
}