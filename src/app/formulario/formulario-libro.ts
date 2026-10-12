import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Libro } from '../modelos/Modelo.libro';
import { PilaLibrosServicio } from '../servicios/pila-libros';

@Component({
  selector: 'app-formulario-libro',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-libro.html',
  styleUrl: './formulario-libro.css',
})
export class FormularioLibro {
  private constructorFormulario = inject(FormBuilder);
  private pilaLibros = inject(PilaLibrosServicio);

  formulario = this.constructorFormulario.nonNullable.group({
    nombre: ['', Validators.required],
    isbn: ['', [Validators.required, Validators.minLength(10)]],
    autor: ['', Validators.required],
    editorial: ['', Validators.required],
  });

  agregar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const libro: Libro = this.formulario.getRawValue();
    this.pilaLibros.agregarLibro(libro);
    this.formulario.reset();
  }
}