import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionServicio } from '../servicios/autenticacion';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>

    <form class="formulario" (submit)="entrar($event, correo.value, clave.value)">
      <div class="campo">
        <label for="correo">Correo</label>
        <input #correo id="correo" type="text" placeholder="user@mail.com" />
      </div>

      <div class="campo">
        <label for="clave">Contraseña</label>
        <input #clave id="clave" type="password" placeholder="123" />
      </div>

      @if (error()) {
        <small class="error">{{ error() }}</small>
      }

      <button type="submit">Login</button>
    </form>
  `,
   styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 80px;
    }
    .formulario {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 340px;
      padding: 12px 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .campo {
      display: grid;
      grid-template-columns: 90px 1fr;
      align-items: center;
      column-gap: 8px;
    }
    .error {
      color: red;
    }
  `,
})
export class Login {
  private autenticacion = inject(AutenticacionServicio);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  error = signal('');

  entrar(evento: Event, correo: string, clave: string): void {
    evento.preventDefault();

    if (this.autenticacion.login(correo, clave)) {
      const retorno = this.ruta.snapshot.queryParamMap.get('retorno');
      this.router.navigateByUrl(retorno ?? '/privado/arbol-binario');
    } else {
      this.error.set('Correo o contraseña incorrectos.');
    }
  }
}