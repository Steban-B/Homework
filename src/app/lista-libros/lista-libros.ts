import { Component, inject, signal } from '@angular/core';
import { Libro } from '../modelos/Modelo.libro';
import { PilaLibrosServicio } from '../servicios/pila-libros';

@Component({
  selector: 'app-lista-libros',
  imports: [],
  templateUrl: './lista-libros.html',
  styleUrl: './lista-libros.css',
})
export class ListaLibros {
  private pilaLibros = inject(PilaLibrosServicio);

  /** Libros de la pila (de la base al tope), viene del servicio */
  libros = this.pilaLibros.libros;

  /** Libro que se está mostrando como resultado de peek o pop */
  libroConsultado = signal<Libro | undefined>(undefined);

  /** Texto que explica qué acción se hizo */
  mensaje = signal('');

  quitarSuperior(): void {
  const libro = this.pilaLibros.quitarLibro();
  this.libroConsultado.set(libro);
  this.mensaje.set(libro ? 'Último libro quitado:' : 'La pila está vacía, no hay nada que quitar.');
}

verSuperior(): void {
  const libro = this.pilaLibros.verLibroSuperior();
  this.libroConsultado.set(libro);
  this.mensaje.set(libro ? 'Libro en el tope (peek):' : 'La pila está vacía, no hay tope.');
}
}