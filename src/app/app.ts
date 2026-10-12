import { Component } from '@angular/core';
import { FormularioLibro } from './formulario/formulario-libro';
import { ListaLibros } from './lista-libros/lista-libros';

@Component({
  selector: 'app-root',
  imports: [FormularioLibro, ListaLibros],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}