import { Component, signal } from '@angular/core';
import { Persona } from '../../modelos/modelo.persona';
import { Cola } from '../../metodos/cola';
import { FormularioPersona } from '../formulario-persona/formulario-persona';
import { ListaPersonas } from '../lista-personas/lista-personas';

@Component({
  selector: 'app-cajero',
  imports: [FormularioPersona, ListaPersonas],
  templateUrl: './cajero.html',
  styleUrl: './cajero.css',
})
export class Cajero {
  
  private cola = new Cola<Persona>(
    (a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime()
  );

  personas = signal<Persona[]>([]);

  personaConsultada = signal<Persona | undefined>(undefined);

  mensaje = signal('');

  constructor() {
    this.cargarDatosDePrueba();
  }

  agregarPersona(datos: { nombre: string; monto: number }): void {
    const persona: Persona = {
      nombre: datos.nombre,
      monto: datos.monto,
      fechaLlegada: this.generarFechaAleatoria(),
    };
    this.cola.enqueue(persona);
    this.actualizar();
  }

  atenderPersona(): void {
    const persona = this.cola.dequeue();
    this.actualizar();
    this.personaConsultada.set(persona);
    this.mensaje.set(
      persona ? 'Persona atendida:' : 'La cola está vacía, no hay a quién atender.'
    );
  }

  verPrimeraPersona(): void {
    const persona = this.cola.peek();
    this.personaConsultada.set(persona);
    this.mensaje.set(
      persona ? 'Persona al frente:' : 'La cola está vacía, no hay nadie al frente.'
    );
  }

  vaciarCola(): void {
    this.cola.vaciar();
    this.actualizar();
    this.personaConsultada.set(undefined);
    this.mensaje.set('Se vació la cola.');
  }

  private actualizar(): void {
    this.personas.set(this.cola.aArreglo());
  }

  private generarFechaAleatoria(): Date {
    const ahora = Date.now();
    const ochoHoras = 8 * 60 * 60 * 1000;
    return new Date(ahora - Math.random() * ochoHoras);
  }

  private cargarDatosDePrueba(): void {
    const datos = [
      { nombre: 'Steban B', monto: 100000 },
      { nombre: 'Juan Jose', monto: 200000 },
      { nombre: 'Ararat', monto: 300000 },
    ];

    datos.forEach((dato) => this.agregarPersona(dato));
  }
}