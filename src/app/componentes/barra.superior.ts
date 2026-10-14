import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';

@Component({
  selector: 'app-barra-superior',
  imports: [RouterLink],
  template: `
    <nav class="navbar bg-primary navbar-dark px-3">
      <a class="navbar-brand" routerLink="/buscador">Explorador</a>

      <div class="d-flex align-items-center gap-3">
        @if (autenticacion.usuario(); as usuario) {
          <span class="text-white">{{ usuario.email }}</span>
          <button type="button" class="btn btn-light btn-sm" (click)="salir()">
            Cerrar sesión
          </button>
        } @else {
          <a class="btn btn-light btn-sm" routerLink="/login">Login</a>
          <a class="btn btn-outline-light btn-sm" routerLink="/registro">Registro</a>
        }
      </div>
    </nav>
  `,
})
export class BarraSuperior {
  autenticacion = inject(AutenticacionServicio);
  private router = inject(Router);

  async salir(): Promise<void> {
    await this.autenticacion.cerrarSesion();
    this.router.navigate(['/login']);
  }
}