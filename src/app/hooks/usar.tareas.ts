import { signal } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { Tarea } from '../modelos/modelo.tarea';

export function usarTareas() {
  const tareas = signal<Tarea[]>([]);

  const coleccion = (uid: string) => collection(db, 'usuarios', uid, 'tareas');
  const documento = (uid: string, id: string) => doc(db, 'usuarios', uid, 'tareas', id);

  function escuchar(uid: string): () => void {
    return onSnapshot(coleccion(uid), (resultado) => {
      const lista = resultado.docs.map((d) => ({ id: d.id, ...d.data() }) as Tarea);
      lista.sort((a, b) => b.creada - a.creada); 
      tareas.set(lista);
    });
  }

  async function agregar(uid: string, titulo: string): Promise<void> {
    await addDoc(coleccion(uid), { titulo, completada: false, creada: Date.now() });
  }

  async function editar(uid: string, id: string, titulo: string): Promise<void> {
    await updateDoc(documento(uid, id), { titulo });
  }

  async function marcar(uid: string, id: string, completada: boolean): Promise<void> {
    await updateDoc(documento(uid, id), { completada });
  }

  async function eliminar(uid: string, id: string): Promise<void> {
    await deleteDoc(documento(uid, id));
  }

  return { tareas, escuchar, agregar, editar, marcar, eliminar };
}