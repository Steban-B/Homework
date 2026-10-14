import { signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';
import { DatoNodo } from '../modelos/modelo.nodo';

export function usarNodos() {
  const nodos = signal<DatoNodo[]>([]);
  const coleccion = collection(db, 'nodos');

  function escuchar(): () => void {
    return onSnapshot(coleccion, (resultado) => {
      nodos.set(resultado.docs.map((d) => ({ id: d.id, ...d.data() }) as DatoNodo));
    });
  }

  async function crear(dato: Omit<DatoNodo, 'id'>): Promise<void> {
    await addDoc(coleccion, dato);
  }

  async function eliminar(id: string): Promise<void> {
    await deleteDoc(doc(db, 'nodos', id));
  }

  return { nodos, escuchar, crear, eliminar };
}