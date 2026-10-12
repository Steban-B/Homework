import { Component } from '@angular/core';
import { Arbol } from './componentes/arbol/arbol';

@Component({
  selector: 'app-root',
  imports: [Arbol],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}