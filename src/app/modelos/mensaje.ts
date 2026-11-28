import { Gif } from './gif';

export type Autor = 'usuario' | 'bot';

export interface Mensaje {
  id: number;
  autor: Autor;
  texto: string;
  gif: Gif | null;
  cargando: boolean;
  hora: Date;
}
