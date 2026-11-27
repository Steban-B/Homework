import { Component, output } from '@angular/core';

@Component({
  selector: 'app-formulario-tarea',
  template: `
    <form class="nueva-tarea" (submit)="agregar($event, entrada)">
      <input #entrada class="campo" type="text" maxlength="120" placeholder="¿Qué tienes pendiente?" />
      <button type="submit" class="boton">Agregar</button>
    </form>
  `,
})
export class FormularioTarea {
  guardar = output<string>();

  agregar(evento: Event, entrada: HTMLInputElement): void {
    evento.preventDefault();
    const titulo = entrada.value.trim();
    if (!titulo) return;

    this.guardar.emit(titulo);
    entrada.value = '';
  }
}
