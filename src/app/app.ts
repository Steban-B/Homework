import { Component } from '@angular/core';
import { Buscador } from './componentes/buscador';
import { Resultados } from './componentes/resultados';
import { Heap } from './componentes/heap';
import { Formulario } from './componentes/formulario';
import { Catalogo } from './componentes/catalogo';

@Component({
  selector: 'app-root',
  imports: [Buscador, Resultados, Heap, Formulario, Catalogo],
  templateUrl: './app.html',
})
export class App {}
