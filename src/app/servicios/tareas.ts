import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { hookTareas } from '../hooks/tareas';
import { Filtro } from '../modelos/tarea';
import { AutenticacionServicio } from './autenticacion';

@Injectable({
  providedIn: 'root',
})
export class TareasServicio {
  private autenticacion = inject(AutenticacionServicio);
  private hook = hookTareas();

  readonly tareas = this.hook.tareas;
  readonly cargando = this.hook.cargando;
  readonly error = signal('');
  readonly filtro = signal<Filtro>('todas');

  readonly pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);
  readonly completadas = computed(() => this.tareas().filter((t) => t.completada).length);

  readonly tareasFiltradas = computed(() => {
    const filtro = this.filtro();
    if (filtro === 'pendientes') return this.tareas().filter((t) => !t.completada);
    if (filtro === 'completadas') return this.tareas().filter((t) => t.completada);
    return this.tareas();
  });

  constructor() {
    effect((alLimpiar) => {
      const uid = this.autenticacion.uid();

      if (!uid) {
        this.tareas.set([]);
        return;
      }

      const dejarDeEscuchar = this.hook.escuchar(uid);
      alLimpiar(dejarDeEscuchar);
    });
  }

  private async intentar(accion: () => Promise<void>): Promise<void> {
    this.error.set('');
    try {
      await accion();
    } catch {
      this.error.set('No se pudo guardar el cambio, intenta de nuevo.');
    }
  }

  agregar(titulo: string): Promise<void> {
    return this.intentar(() => this.hook.agregar(titulo));
  }

  editar(id: number, titulo: string): Promise<void> {
    return this.intentar(() => this.hook.actualizar(id, { titulo }));
  }

  marcar(id: number, completada: boolean): Promise<void> {
    return this.intentar(() => this.hook.actualizar(id, { completada }));
  }

  eliminar(id: number): Promise<void> {
    return this.intentar(() => this.hook.eliminar(id));
  }
}
