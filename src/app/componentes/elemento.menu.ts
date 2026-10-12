import { Component, input, output, signal } from '@angular/core';
import { ItemMenu } from '../modelos/modelo.menu';

@Component({
  selector: 'app-elemento-menu',
  imports: [ElementoMenu],
  template: `
    <button
      type="button"
      class="fila"
      [class.activo]="item().enlace === seleccionado()"
      [style.padding-left.px]="24 + nivel() * 34"
      (click)="alHacerClic()"
    >
      <span>{{ item().titulo }}</span>
      @if (item().hijos.length > 0) {
        <span class="flecha">{{ abierto() ? '▲' : '▼' }}</span>
      }
    </button>

    @if (abierto() && item().hijos.length > 0) {
      <div class="submenu">
        @for (hijo of item().hijos; track hijo.enlace) {
          <app-elemento-menu
            [item]="hijo"
            [nivel]="nivel() + 1"
            [seleccionado]="seleccionado()"
            (seleccionar)="seleccionar.emit($event)"
          />
        }
      </div>
    }
  `,
  styles: `
    .fila {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 14px 24px;
      background: transparent;
      border: none;
      border-left: 4px solid transparent;
      color: #e0e0e0;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
    }
    .fila:hover {
      background: #2a2d31;
    }
    .fila.activo {
      background: #34506e;
      border-left-color: #5b9bd5;
    }
    .flecha {
      font-size: 10px;
    }
    .submenu {
      background: #16181b;
    }
  `,
})
export class ElementoMenu {
  item = input.required<ItemMenu>();
  nivel = input(0);
  seleccionado = input('');

  seleccionar = output<ItemMenu>();

  abierto = signal(true);

  alHacerClic(): void {
    if (this.item().hijos.length > 0) {
      this.abierto.update((valor) => !valor);
    } else {
      this.seleccionar.emit(this.item());
    }
  }
}