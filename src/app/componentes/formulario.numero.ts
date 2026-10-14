import { Component, output } from '@angular/core';

@Component({
  selector: 'app-formulario-numero',
  template: `
    <div class="fila">
      <input #buscarEntrada type="number" placeholder="Buscar número" (keydown.enter)="alBuscar(buscarEntrada)" />
      <button type="button" (click)="alBuscar(buscarEntrada)">Buscar</button>
    </div>

    <div class="fila">
      <input #insertarEntrada type="number" placeholder="Insertar número" (keydown.enter)="alInsertar(insertarEntrada)" />
      <button type="button" (click)="alInsertar(insertarEntrada)">Insertar</button>
    </div>

    <div class="fila">
      <button type="button" (click)="cargarEjemplo.emit()">Cargar ejemplo</button>
      <button type="button" (click)="verOrdenes.emit()">Ver órdenes</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .fila {
      display: flex;
      gap: 8px;
    }
  `,
})
export class FormularioNumero {
  buscar = output<number>();
  insertar = output<number>();
  cargarEjemplo = output<void>();
  verOrdenes = output<void>();

  alBuscar(entrada: HTMLInputElement): void {
    if (entrada.value === '') return;
    this.buscar.emit(Number(entrada.value));
  }

  alInsertar(entrada: HTMLInputElement): void {
    if (entrada.value === '') return;
    this.insertar.emit(Number(entrada.value));
    entrada.value = '';
  }
}