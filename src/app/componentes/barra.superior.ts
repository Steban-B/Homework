import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';
import { FotoPerfil } from './foto.perfil';

@Component({
  selector: 'app-barra-superior',
  imports: [RouterLink, RouterLinkActive, FotoPerfil],
  template: `
    <header class="barra">
      <a class="barra__marca" routerLink="/tareas">
        <span class="barra__logo">✓</span>
        Mis Tareas
      </a>

      <nav class="barra__menu">
        @if (autenticacion.haIniciadoSesion()) {
          <a class="barra__enlace" routerLink="/tareas" routerLinkActive="barra__enlace--activo">Tareas</a>
          <a class="barra__usuario" routerLink="/perfil" routerLinkActive="barra__usuario--activo">
            <app-foto-perfil [url]="autenticacion.avatarUrl()" [inicial]="autenticacion.inicial()" />
            <span class="barra__correo">{{ autenticacion.correo() }}</span>
          </a>
          <button type="button" class="boton boton--borde boton--pequeno" (click)="salir()">Salir</button>
        } @else {
          <a class="barra__enlace" routerLink="/login" routerLinkActive="barra__enlace--activo">Iniciar sesión</a>
          <a class="boton boton--pequeno" routerLink="/registro">Crear cuenta</a>
        }
      </nav>
    </header>
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
