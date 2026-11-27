import { signal } from '@angular/core';
import { supabase } from '../supabase.config';

const BUCKET = 'avatars';

export function hookAvatar() {
  const subiendo = signal(false);

  // la ruta empieza con el uid porque las politicas del bucket solo dejan escribir en tu carpeta
  async function subir(uid: string, archivo: File): Promise<string> {
    const ruta = `${uid}/avatar`;
    subiendo.set(true);

    try {
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(ruta, archivo, { upsert: true, contentType: archivo.type });
      if (error) throw error;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(ruta);

      // el ?v= es para que el navegador no muestre la foto vieja guardada en cache
      const url = `${data.publicUrl}?v=${Date.now()}`;

      const { error: errorUsuario } = await supabase.auth.updateUser({ data: { avatar_url: url } });
      if (errorUsuario) throw errorUsuario;

      return url;
    } finally {
      subiendo.set(false);
    }
  }

  return { subiendo, subir };
}
