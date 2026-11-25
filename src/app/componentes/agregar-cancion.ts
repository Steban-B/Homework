import { Component, inject, signal } from '@angular/core';
import { MusicaServicio } from '../servicios/musica';

@Component({
  selector: 'app-agregar-cancion',
  template: `
    <section class="tarjeta">
      <h2 class="tarjeta__titulo">Agregar cancion</h2>

      <form class="formulario" (submit)="agregar($event)">
        <input class="campo" placeholder="Titulo" [value]="titulo()" (input)="titulo.set(valor($event))" />
        <input class="campo" placeholder="Artista" [value]="artista()" (input)="artista.set(valor($event))" />

        <select class="campo" (change)="genero.set(valor($event))">
          @for (g of generos; track g) {
            <option [value]="g">{{ g }}</option>
          }
        </select>

        <input
          class="campo"
          type="number"
          min="0"
          placeholder="Reproducciones"
          [value]="reproducciones()"
          (input)="reproducciones.set(+valor($event))"
        />

        <select class="campo" (change)="relacionada.set(+valor($event))">
          <option value="0">Sin cancion relacionada</option>
          @for (c of musica.canciones(); track c.id) {
            <option [value]="c.id">{{ c.titulo }}</option>
          }
        </select>

        <button class="boton" type="submit">Agregar</button>
      </form>

      @if (mensaje()) {
        <p class="estado" [class.estado--ok]="exito()" [class.estado--error]="!exito()">{{ mensaje() }}</p>
      }
    </section>
  `
})
export class AgregarCancion {
  musica = inject(MusicaServicio);
  generos = ['Trap', 'Drill', 'Reggaeton'];

  titulo = signal('');
  artista = signal('');
  genero = signal('Trap');
  reproducciones = signal(0);
  relacionada = signal(0);

  mensaje = signal('');
  exito = signal(false);

  valor(evento: Event): string {
    return (evento.target as HTMLInputElement).value;
  }

  agregar(evento: Event): void {
    evento.preventDefault();

    const ok = this.musica.agregarCancion(
      {
        titulo: this.titulo().trim(),
        artista: this.artista().trim() || 'Desconocido',
        genero: this.genero(),
        reproducciones: this.reproducciones()
      },
      this.relacionada() ? [this.relacionada()] : []
    );

    this.exito.set(ok);
    this.mensaje.set(ok ? 'Cancion agregada' : 'El titulo esta vacio o ya existe');

    if (ok) {
      this.titulo.set('');
      this.artista.set('');
      this.reproducciones.set(0);
    }
  }
}