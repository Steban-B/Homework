import { signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase.config';

export function mensajeDeError(error: unknown): string {
  const codigo = (error as { code?: string }).code;

  switch (codigo) {
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'Ese correo ya está registrado.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/invalid-email':
      return 'El correo no es válido.';
    default:
      return 'Ocurrió un error. Intenta de nuevo.';
  }
}

export function usarAutenticacion() {

  const usuario = signal<User | null>(null);

  const listo = new Promise<void>((resolver) => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      usuario.set(usuarioFirebase);
      resolver();
    });
  });

  async function registrar(correo: string, clave: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, correo, clave);
  }

  async function iniciarSesion(correo: string, clave: string): Promise<void> {
    await signInWithEmailAndPassword(auth, correo, clave);
  }

  async function cerrarSesion(): Promise<void> {
    await signOut(auth);
  }

  return { usuario, listo, registrar, iniciarSesion, cerrarSesion };
}