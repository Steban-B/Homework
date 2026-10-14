import { Injectable, effect, inject } from '@angular/core';
import { usarTareas } from '../hooks/usar.tareas';
import { AutenticacionServicio } from './aut.servicio';

@Injectable({
  providedIn: 'root',
})
export class TareasServicio {
  private autenticacion = inject(AutenticacionServicio);
  private hook = usarTareas();

  readonly tareas = this.hook.tareas;

  constructor() {

    effect((alLimpiar) => {
      const usuario = this.autenticacion.usuario();

      if (!usuario) {
        this.hook.tareas.set([]);
        return;
      }

      const dejarDeEscuchar = this.hook.escuchar(usuario.uid);
      alLimpiar(dejarDeEscuchar);
    });
  }

  private uid(): string | undefined {
    return this.autenticacion.usuario()?.uid;
  }

  agregar(titulo: string): void {
    const uid = this.uid();
    if (uid) this.hook.agregar(uid, titulo);
  }

  editar(id: string, titulo: string): void {
    const uid = this.uid();
    if (uid) this.hook.editar(uid, id, titulo);
  }

  marcar(id: string, completada: boolean): void {
    const uid = this.uid();
    if (uid) this.hook.marcar(uid, id, completada);
  }

  eliminar(id: string): void {
    const uid = this.uid();
    if (uid) this.hook.eliminar(uid, id);
  }
}