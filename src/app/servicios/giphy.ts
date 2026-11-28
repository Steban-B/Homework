import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Gif } from '../modelos/gif';

interface ImagenGiphy {
  url: string;
  width: string;
  height: string;
}

interface GifGiphy {
  id: string;
  title: string;
  images: { fixed_height: ImagenGiphy };
}

interface RespuestaBusqueda {
  data: GifGiphy[];
}

interface RespuestaAleatoria {
  data: GifGiphy | [];
}

export class ErrorGiphy extends Error {
  constructor(readonly estado: number) {
    super(`Giphy respondio con estado ${estado}`);
  }
}

const TIEMPO_LIMITE = 8000;

@Injectable({
  providedIn: 'root',
})
export class GiphyServicio {
  private async pedir<T>(ruta: string, parametros: Record<string, string>, senal?: AbortSignal): Promise<T> {
    const consulta = new URLSearchParams({ api_key: environment.giphyApiKey, rating: 'g', ...parametros });

    const limite = new AbortController();
    const temporizador = setTimeout(() => limite.abort(), TIEMPO_LIMITE);
    const cancelar = () => limite.abort();
    senal?.addEventListener('abort', cancelar);

    try {
      const respuesta = await fetch(`${environment.giphyUrl}${ruta}?${consulta}`, { signal: limite.signal });
      if (!respuesta.ok) throw new ErrorGiphy(respuesta.status);
      return (await respuesta.json()) as T;
    } finally {
      clearTimeout(temporizador);
      senal?.removeEventListener('abort', cancelar);
    }
  }

  private convertir(gif: GifGiphy): Gif {
    const imagen = gif.images.fixed_height;
    return {
      id: gif.id,
      titulo: gif.title,
      url: imagen.url,
      ancho: Number(imagen.width),
      alto: Number(imagen.height),
    };
  }

  async buscarGifs(texto: string, senal?: AbortSignal): Promise<Gif[]> {
    const respuesta = await this.pedir<RespuestaBusqueda>(
      '/gifs/search',
      { q: texto, limit: '12', lang: 'es' },
      senal,
    );
    return respuesta.data.map((gif) => this.convertir(gif));
  }

  async stickerAleatorio(tema: string, senal?: AbortSignal): Promise<Gif | null> {
    const respuesta = await this.pedir<RespuestaAleatoria>('/stickers/random', { tag: tema }, senal);
    return Array.isArray(respuesta.data) ? null : this.convertir(respuesta.data);
  }
}
