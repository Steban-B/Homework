import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-404',
  imports: [RouterLink],
  template: `
    <h2>404 - Página no encontrada</h2>
    <a routerLink="/login">Ir al inicio</a>
  `,
})
export class Error404 {}