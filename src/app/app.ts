import { Component } from '@angular/core';
import { Panel } from './componentes/panel';

@Component({
  selector: 'app-root',
  imports: [Panel],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}