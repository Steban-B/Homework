import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';

@Component({
  selector: 'app-barra-superior',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="barra">
      <strong>Arboles</strong>

      @if (autenticacion.haIniciadoSesion()) {
        <nav>
          <a routerLink="/privado/arbol-binario" routerLinkActive="activo">Árbol binario</a>
          <a routerLink="/privado/Arbol N-ario" routerLinkActive="activo">Árbol N-ario</a>
        </nav>

        <button type="button" (click)="salir()">Cerrar sesión</button>
      }
    </header>
  `,
    styles: `
    .barra {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      border-bottom: 1px solid #ccc;
    }
    nav {
      display: flex;
      gap: 12px;
      flex: 1;
    }
    a.activo {
      font-weight: bold;
    }
  `,
})
export class BarraSuperior {
  autenticacion = inject(AutenticacionServicio);
  private router = inject(Router);

  salir(): void {
    this.autenticacion.cerrarSesion();
    this.router.navigate(['/login']);
  }
}