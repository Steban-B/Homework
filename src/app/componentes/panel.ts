import { Component, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ArbolMenu } from '../metodos/arbol.menu';
import { ItemMenu, crearItem } from '../modelos/modelo.menu';
import { ElementoMenu } from './elemento.menu';
import { Pagina } from './pagina';

@Component({
  selector: 'app-panel',
  imports: [ElementoMenu, NgComponentOutlet],
  template: `
    <nav class="barra">
      @for (item of items; track item.enlace) {
        <app-elemento-menu
          [item]="item"
          [seleccionado]="seleccionado()?.enlace ?? ''"
          (seleccionar)="seleccionado.set($event)"
        />
      }
    </nav>

    <main class="contenido">
      @if (seleccionado(); as item) {
        <ng-container
          [ngComponentOutlet]="item.componente"
          [ngComponentOutletInputs]="{ titulo: item.titulo, enlace: item.enlace }"
        />
      } @else {
        <p>Selecciona una opción del menú.</p>
      }
    </main>
  `,
  styles: `
    :host {
      display: flex;
    }
    .barra {
      width: 260px;
      min-height: 100vh;
      padding-top: 8px;
      background: #1e2124;
    }
    .contenido {
      flex: 1;
      padding: 24px;
    }
  `,
})
export class Panel {
  private arbol = new ArbolMenu(crearItem('Menú', '/', Pagina));

  items = this.arbol.raiz.hijos;

  seleccionado = signal<ItemMenu | null>(null);

  constructor() {
    this.cargarMenus();
    this.seleccionado.set(this.arbol.buscar('/inicio') ?? null);
  }

  private cargarMenus(): void {
  const a = this.arbol;

    a.agregar('/', crearItem('Perfil', '/perfil', Pagina));
    a.agregar('/', crearItem('Mensajes', '/mensajes', Pagina));

    a.agregar('/', crearItem('Notas', '/notas', Pagina));
    a.agregar('/notas', crearItem('Estudiar para el parcial', '/notas/parcial', Pagina));
    a.agregar('/notas', crearItem('Carta para mi ex', '/notas/carta-ex', Pagina));
    a.agregar('/notas', crearItem('Quien lo lea es...', '/notas/quien-lo-lea', Pagina));

    a.agregar('/', crearItem('Configuración', '/configuracion', Pagina));
    a.agregar('/configuracion', crearItem('Cuenta', '/configuracion/cuenta', Pagina));
    a.agregar('/configuracion', crearItem('Perfil', '/configuracion/perfil', Pagina));
    a.agregar('/configuracion', crearItem('Seguridad y privacidad', '/configuracion/seguridad', Pagina));
    a.agregar('/configuracion', crearItem('Contraseña', '/configuracion/contrasena', Pagina));
    a.agregar('/configuracion', crearItem('Notificaciones', '/configuracion/notificaciones', Pagina));

    a.agregar('/', crearItem('Ayuda', '/ayuda', Pagina));
    a.agregar('/ayuda', crearItem('Preguntas frecuentes', '/ayuda/faq', Pagina));
    a.agregar('/ayuda', crearItem('Enviar un ticket', '/ayuda/ticket', Pagina));
    a.agregar('/ayuda', crearItem('Estado de la red', '/ayuda/red', Pagina));

    a.agregar('/', crearItem('Cerrar sesión', '/salir', Pagina));
}
}