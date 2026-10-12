import { Component } from '@angular/core';
import { Cajero } from './componentes/cajero/cajero';

@Component({
  selector: 'app-root',
  imports: [Cajero],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}