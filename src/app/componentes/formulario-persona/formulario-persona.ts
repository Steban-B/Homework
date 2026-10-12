import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-persona',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-persona.html',
  styleUrl: './formulario-persona.css',
})
export class FormularioPersona {
  private constructorFormulario = inject(FormBuilder);

  personaCreada = output<{ nombre: string; monto: number }>();

  formulario = this.constructorFormulario.nonNullable.group({
    nombre: ['', Validators.required],
    monto: [0, [Validators.required, Validators.min(1)]],
  });

  agregar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.personaCreada.emit(this.formulario.getRawValue());
    this.formulario.reset();
  }
}