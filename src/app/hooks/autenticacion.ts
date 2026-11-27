import { signal } from '@angular/core';
import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '../supabase.config';

export function mensajeDeError(error: unknown): string {
  const codigo = (error as AuthError | null)?.code;

  switch (codigo) {
    case 'invalid_credentials':
      return 'Correo o contraseña incorrectos.';
    case 'user_already_exists':
    case 'email_exists':
      return 'Ese correo ya está registrado.';
    case 'weak_password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'email_address_invalid':
    case 'validation_failed':
      return 'El correo no es válido.';
    case 'over_request_rate_limit':
      return 'Demasiados intentos, espera un momento.';
    default:
      return 'Ocurrió un error. Intenta de nuevo.';
  }
}

export function hookAutenticacion() {
  const usuario = signal<User | null>(null);

  const listo = new Promise<void>((resolver) => {
    supabase.auth.onAuthStateChange((_evento, sesion) => {
      usuario.set(sesion?.user ?? null);
      resolver();
    });
  });

  async function registrar(correo: string, clave: string): Promise<void> {
    const { error } = await supabase.auth.signUp({ email: correo, password: clave });
    if (error) throw error;
  }

  async function iniciarSesion(correo: string, clave: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
    if (error) throw error;
  }

  async function cerrarSesion(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return { usuario, listo, registrar, iniciarSesion, cerrarSesion };
}
