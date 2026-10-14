import { Injectable, computed, effect, inject } from '@angular/core';
import { usarNodos } from '../hooks/usar.nodos';
import { ArbolNodos, TipoNodo } from '../modelos/modelo.nodo';
import { AutenticacionServicio } from './autenticacion';

@Injectable({
  providedIn: 'root',
})
export class NodosServicio {
  private autenticacion = inject(AutenticacionServicio);
  private hook = usarNodos();

  readonly arbol = computed(() => new ArbolNodos(this.hook.nodos()));
  readonly raiz = computed(() => this.arbol().raiz);

  constructor() {
    effect((alLimpiar) => {
      if (!this.autenticacion.usuario()) {
        this.hook.nodos.set([]);
        return;
      }
      alLimpiar(this.hook.escuchar());
    });
  }

  async crear(nombre: string, tipo: TipoNodo, idPadre: string): Promise<void> {
    const correo = this.autenticacion.usuario()?.email;
    if (!correo) throw new Error('Debes iniciar sesión para crear.');

    const nombreLimpio = nombre.trim();
    this.arbol().validarNuevo(idPadre, nombreLimpio);

    await this.hook.crear({
      nombre: nombreLimpio,
      tipo,
      idPadre: idPadre === 'raiz' ? null : idPadre,
      creadoPor: correo,
      creada: Date.now(),
    });
  }

  async eliminar(id: string): Promise<void> {
    const nodo = this.arbol().buscar(id);
    if (!nodo) return;
    if (nodo.hijos.length > 0) throw new Error('Solo se pueden eliminar carpetas vacías.');

    await this.hook.eliminar(id);
  }
}