import { Injectable, signal } from '@angular/core';
import { Libro } from '../modelos/Modelo.libro';
import { Pila } from '../metodos/Pila';

@Injectable({
  providedIn: 'root',
})
export class PilaLibrosServicio {
  private pila = new Pila<Libro>();

  /** Signal con los libros de la pila (de la base al tope) */
  readonly libros = signal<Libro[]>([]);

  constructor() {
    this.cargarDatosDePrueba();
  }

  /** Agrega un libro encima de la pila */
  agregarLibro(libro: Libro): void {
    this.pila.push(libro);
    this.actualizar();
  }

  /** Quita el libro de arriba y lo devuelve */
  quitarLibro(): Libro | undefined {
    const libro = this.pila.pop();
    this.actualizar();
    return libro;
  }

  /** Devuelve el libro de arriba sin quitarlo */
  verLibroSuperior(): Libro | undefined {
    return this.pila.peek();
  }

  /** Cantidad de libros en la pila */
  cantidad(): number {
    return this.pila.tamano();
  }

  /** Copia los datos de la pila al signal para que la pantalla se actualice */
  private actualizar(): void {
    this.libros.set(this.pila.aArreglo());
  }

  /** Llena la pila con datos de prueba */
  private cargarDatosDePrueba(): void {
    const datos: Libro[] = [
      {
        nombre: 'Cien años de soledad',
        isbn: '978-0307474728',
        autor: 'Gabriel García Márquez',
        editorial: 'Vintage Español',
      },
      {
        nombre: 'El amor en los tiempos del cólera',
        isbn: '978-0307387264',
        autor: 'Gabriel García Márquez',
        editorial: 'Vintage Español',
      },
      {
        nombre: 'Don Quijote de la Mancha',
        isbn: '978-8420412146',
        autor: 'Miguel de Cervantes',
        editorial: 'Alfaguara',
      },
      {
        nombre: 'La sombra del viento',
        isbn: '978-8408172177',
        autor: 'Carlos Ruiz Zafón',
        editorial: 'Planeta',
      },
    ];

    datos.forEach((libro) => this.pila.push(libro));
    this.actualizar();
  }
}