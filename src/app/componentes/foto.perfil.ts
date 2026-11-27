import { Component, input } from '@angular/core';

@Component({
  selector: 'app-foto-perfil',
  template: `
    <span class="foto" [class.foto--grande]="grande()">
      @if (url()) {
        <img [src]="url()" alt="Foto de perfil" />
      } @else {
        {{ inicial() }}
      }
    </span>
  `,
})
export class FotoPerfil {
  url = input<string | null>(null);
  inicial = input('?');
  grande = input(false);
}
