import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Gif } from '../modelos/gif';
import { Autor, Mensaje } from '../modelos/mensaje';
import { ErrorGiphy, GiphyServicio } from './giphy';

const alAzar = <T>(lista: T[]): T => lista[Math.floor(Math.random() * lista.length)];
const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

@Injectable({
  providedIn: 'root',
})
export class ChatServicio {
  private giphy = inject(GiphyServicio);
  private contador = 0;
  private controlador: AbortController | null = null;

  readonly mensajes = signal<Mensaje[]>([]);
  readonly escribiendo = signal(false);

  private agregar(autor: Autor, texto: string, gif: Gif | null = null, cargando = false): number {
    const id = ++this.contador;
    this.mensajes.update((lista) => [...lista, { id, autor, texto, gif, cargando, hora: new Date() }]);
    return id;
  }

  private editar(id: number, cambios: Partial<Mensaje>): void {
    this.mensajes.update((lista) => lista.map((m) => (m.id === id ? { ...m, ...cambios } : m)));
  }

  private mensajeDeError(error: unknown): string {
    if (error instanceof ErrorGiphy && (error.estado === 401 || error.estado === 403)) {
      return 'La API key de Giphy no funciona, revisa el archivo environment.';
    }
    if (error instanceof ErrorGiphy && error.estado === 429) {
      return 'Llegamos al límite de búsquedas de Giphy, espera un rato.';
    }
    return 'No pude conectarme con Giphy, intenta otra vez.';
  }

  async enviar(texto: string): Promise<void> {
    const busqueda = texto.trim().slice(0, 50);
    if (!busqueda) return;

    this.controlador?.abort();
    const controlador = new AbortController();
    this.controlador = controlador;

    const id = this.agregar('usuario', busqueda, null, true);

    if (!environment.giphyApiKey || environment.giphyApiKey === 'PEGA_AQUI_TU_API_KEY') {
      this.editar(id, { cargando: false });
      this.agregar('bot', 'Falta poner la API key de Giphy en el archivo environment.');
      return;
    }

    try {
      const gifs = await this.giphy.buscarGifs(busqueda, controlador.signal);
      this.editar(id, { gif: gifs.length ? alAzar(gifs) : null, cargando: false });

      this.escribiendo.set(true);
      await esperar(700 + Math.random() * 800);
      if (controlador.signal.aborted) return;

      if (!gifs.length) {
        this.agregar('bot', `No encontré GIFs de "${busqueda}", prueba con otra palabra.`);
        return;
      }

      const sticker =
        (await this.giphy.stickerAleatorio(busqueda, controlador.signal)) ??
        (await this.giphy.stickerAleatorio('', controlador.signal));

      if (sticker) this.agregar('bot', '', sticker);
      else this.agregar('bot', 'No encontré un sticker para responderte.');
    } catch (error) {
      if (controlador.signal.aborted) return;
      this.editar(id, { cargando: false });
      this.agregar('bot', this.mensajeDeError(error));
    } finally {
      if (this.controlador === controlador) {
        this.escribiendo.set(false);
        this.controlador = null;
      } else {
        this.editar(id, { cargando: false });
      }
    }
  }
}
