import { Component, inject } from '@angular/core';
import { GrafoServicio } from './servicios/grafo';
import { FormularioCiudad } from './componentes/formulario.ciudad';
import { FormularioPersona } from './componentes/formulario.persona';
import { Ciudades } from './componentes/ciudades';
import { VisorGrafo } from './componentes/visor.grafo';
import { Personas } from './componentes/personas';
import { Adyacencia } from './componentes/adyacencia';

@Component({
  selector: 'app-root',
  imports: [FormularioCiudad, FormularioPersona, Ciudades, VisorGrafo, Personas, Adyacencia],
  templateUrl: './app.html',
})
export class App {
  servicio = inject(GrafoServicio);
}
