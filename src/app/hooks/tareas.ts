import { signal } from '@angular/core';
import { supabase } from '../supabase.config';
import { Tarea } from '../modelos/tarea';

export function hookTareas() {
  const tareas = signal<Tarea[]>([]);
  const cargando = signal(false);

  const ordenar = (lista: Tarea[]) => [...lista].sort((a, b) => b.id - a.id);

  function ponerTarea(tarea: Tarea): void {
    tareas.update((lista) =>
      lista.some((t) => t.id === tarea.id)
        ? lista.map((t) => (t.id === tarea.id ? tarea : t))
        : ordenar([tarea, ...lista]),
    );
  }

  function quitarTarea(id: number): void {
    tareas.update((lista) => lista.filter((t) => t.id !== id));
  }

  async function cargar(): Promise<void> {
    cargando.set(true);
    const { data, error } = await supabase.from('tareas').select('*').order('id', { ascending: false });
    cargando.set(false);
    if (error) throw error;
    tareas.set(data as Tarea[]);
  }

  function escuchar(uid: string): () => void {
    cargar();

    const canal = supabase
      .channel(`tareas-${uid}`)
      .on<Tarea>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'tareas', filter: `user_id=eq.${uid}` },
        (cambio) => ponerTarea(cambio.new),
      )
      .on<Tarea>(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'tareas', filter: `user_id=eq.${uid}` },
        (cambio) => ponerTarea(cambio.new),
      )
      .on<Tarea>('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tareas' }, (cambio) => {
        if (cambio.old.id) quitarTarea(cambio.old.id);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }

  async function agregar(titulo: string): Promise<void> {
    const { data, error } = await supabase.from('tareas').insert({ titulo }).select().single();
    if (error) throw error;
    ponerTarea(data as Tarea);
  }

  async function actualizar(id: number, cambios: Partial<Pick<Tarea, 'titulo' | 'completada'>>): Promise<void> {
    const { data, error } = await supabase.from('tareas').update(cambios).eq('id', id).select().single();
    if (error) throw error;
    ponerTarea(data as Tarea);
  }

  async function eliminar(id: number): Promise<void> {
    const { error } = await supabase.from('tareas').delete().eq('id', id);
    if (error) throw error;
    quitarTarea(id);
  }

  return { tareas, cargando, escuchar, agregar, actualizar, eliminar };
}
