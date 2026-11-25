import { Component } from '@angular/core';
import { Buscador } from './componentes/buscador';
import { AgregarCancion } from './componentes/agregar-cancion';
import { Ranking } from './componentes/ranking';
import { Recomendaciones } from './componentes/recomendaciones';

@Component({
  selector: 'app-root',
  imports: [Buscador, AgregarCancion, Ranking, Recomendaciones],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}