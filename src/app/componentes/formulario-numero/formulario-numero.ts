import { Component, output } from '@angular/core';

@Component({
  selector: 'app-formulario-numero',
  imports: [],
  templateUrl: './formulario-numero.html',
  styleUrl: './formulario-numero.css',
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