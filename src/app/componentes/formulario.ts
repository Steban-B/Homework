import { Component, output } from '@angular/core';

@Component({
  selector: 'app-formulario-tarea',
  template: `
    <div class="input-group">
      <input
        #entrada
        type="text"
        class="form-control"
        placeholder="Escribe una tarea nueva"
        (keydown.enter)="agregar(entrada)"
      />
      <button type="button" class="btn btn-primary" (click)="agregar(entrada)">Agregar</button>
    </div>
  `,
})
export class FormularioTarea {
  guardar = output<string>();

  agregar(entrada: HTMLInputElement): void {
    const titulo = entrada.value.trim();
    if (!titulo) return;

    this.guardar.emit(titulo);
    entrada.value = '';
  }
}