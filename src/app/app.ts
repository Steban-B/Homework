import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraSuperior } from './componentes/barra.superior';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraSuperior],
  templateUrl: './app.html',
})
export class App {}