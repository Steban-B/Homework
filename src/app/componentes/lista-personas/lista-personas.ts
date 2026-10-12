import { Component, input, output } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Persona } from '../../modelos/modelo.persona';

@Component({
  selector: 'app-lista-personas',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './lista-personas.html',
  styleUrl: './lista-personas.css',
})
export class ListaPersonas {

  personas = input.required<Persona[]>();

  personaConsultada = input<Persona | undefined>();

  mensaje = input('');

  atender = output<void>();
  verPrimera = output<void>();
  vaciar = output<void>();
}